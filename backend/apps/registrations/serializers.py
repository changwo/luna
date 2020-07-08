from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.registrations.models import Registration, get_or_none
from apps.users.serializer import UserSerializer

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['email']


class ResetPasswordSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    code = serializers.CharField()

    email = serializers.CharField(write_only=True,
                                  required=True, )

    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'password_repeat',
            'code',
        ]

    def validate(self, data):
        if not get_or_none(Registration, email=data.get('email')):
            raise serializers.ValidationError({"detail": "Your email is invalid!"})
        if data.get('code') != Registration.objects.get(email=data.get('email')).code:
            raise serializers.ValidationError({"detail": "Your validation code is incorrect!"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"detail": "the passwords do not match!"})
        return data


class CreateUserSerializer(UserSerializer):
    password_repeat = serializers.CharField(
        min_length=4,
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    code = serializers.CharField()

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
            'password_repeat',
            'code',
        ]

    def validate(self, data):
        try:
            target_profile = Registration.objects.get(email=data.get('email'))
        except Registration.DoesNotExist:
            raise serializers.ValidationError({"1": "Your email is incorrect or does not exist!"})
        if data.get('code') != target_profile.code:
            raise serializers.ValidationError({"2": "Your validation code is incorrect!"})
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({"3": "The passwords do not match!"})
        if not len(data.get('first_name')):
            raise serializers.ValidationError({"4": "First name cannot be empty!"})
        if not len(data.get('username')):
            raise serializers.ValidationError({"5": "Username cannot be empty!"})
        if not len(data.get('last_name')):
            raise serializers.ValidationError({"6": "Last name cannot be empty!"})
        return data
