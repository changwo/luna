# Generated by Django 3.0.3 on 2020-07-06 07:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('comments', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurantreviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='author_comments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='likes',
            field=models.ManyToManyField(related_name='liked_comments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='restaurant_review',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='restaurantreviews.RestaurantReview'),
        ),
    ]
