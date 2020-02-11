from __future__ import unicode_literals

from django.db import models
from django.core.validators import MinValueValidator


# Create your models here.
# TODO: need to find a way to allow multiple primary keys
# perhaps: https://stackoverflow.com/questions/16800375/how-can-set-two-primary-key-fields-for-my-models-in-django

class Shoe(models.Model):
    sid = models.AutoField(primary_key=True)
    # Please see here for difference between db_index and unique
    # https://www.reddit.com/r/django/comments/8tlscw/what_is_the_difference_between_db_indextrue_and/
    style = models.CharField(max_length=100, db_index=True)
    price = models.FloatField(db_index=True)
    brand = models.CharField(max_length=100, db_index=True)
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    size = models.IntegerField(validators=[MinValueValidator(0)], db_index=True)
    image_url = models.URLField()
    colour = models.CharField(max_length=100, db_index=True)
    name = models.CharField(max_length=100)
    release_date = models.DateField()
    description = models.CharField(max_length=1000)

    def __str__(self):
        # default return value when querying for readability
        return self.name


class Customer(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
