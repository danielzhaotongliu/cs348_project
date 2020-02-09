from __future__ import unicode_literals

from django.db import models
from django.core.validators import MinValueValidator


# Create your models here.
class Shoe(models.Model):
    sid = models.IntegerField(primary_key=True)
    style = models.CharField(max_length=100)
    price = models.FloatField()
    brand = models.CharField(max_length=100)
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    size = models.IntegerField(validators=[MinValueValidator(0)])
    image_url = models.URLField()
    colour = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    release_date = models.DateField()
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name
