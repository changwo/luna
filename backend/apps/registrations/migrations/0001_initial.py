# Generated by Django 3.0.3 on 2020-07-10 07:04

import apps.registrations.models
import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default='example@email.com', max_length=254, unique=True)),
                ('code', models.CharField(default=apps.registrations.models.code_generator, max_length=5)),
                ('code_type', models.CharField(choices=[('RVC', 'Registration Validation Code'), ('PRC', 'Password Reset Code')], max_length=3)),
                ('code_expiration', models.DateTimeField(default=datetime.datetime(2020, 7, 12, 7, 4, 50, 373923, tzinfo=utc))),
                ('created', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
