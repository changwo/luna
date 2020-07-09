# Generated by Django 3.0.3 on 2020-07-09 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('category_id', models.TextField(choices=[('1', 'Ethnic'), ('2', 'Fast Food'), ('3', 'Fast Casual'), ('4', 'Casual Dining'), ('5', 'Premium Casual'), ('6', 'Family Style'), ('7', 'Fine Dining'), ('8', 'Pub')], max_length=2)),
                ('street', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, max_length=500)),
                ('country', models.CharField(max_length=50)),
                ('zip', models.CharField(max_length=20)),
                ('website', models.CharField(blank=True, max_length=150, null=True)),
                ('phone', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('opening_hours', models.CharField(max_length=50)),
                ('price_level', models.CharField(blank=True, max_length=50, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]