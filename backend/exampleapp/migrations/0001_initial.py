# Generated by Django 2.2.9 on 2020-02-09 20:30

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Shoe',
            fields=[
                ('sid', models.IntegerField(primary_key=True, serialize=False)),
                ('style', models.CharField(max_length=100)),
                ('price', models.FloatField()),
                ('brand', models.CharField(max_length=100)),
                ('stock', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('size', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('image_url', models.URLField()),
                ('colour', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('release_date', models.DateField()),
                ('description', models.CharField(max_length=1000)),
            ],
        ),
    ]
