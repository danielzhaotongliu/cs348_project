from __future__ import unicode_literals

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Customer(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)


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


class Review(models.Model):
    uid = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    sid = models.ForeignKey(Shoe, null=True, on_delete=models.SET_NULL)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()

    # Django does not allow multi-attribute primary key columns see below
    # https://stackoverflow.com/questions/16800375/how-can-set-two-primary-key-fields-for-my-models-in-django
    # The declaration below only adds constraints to data
    class Meta:
        unique_together = (('uid', 'sid'),)


class PaymentMethod(models.Model):
    CARD_TYPE = [('VISA', 'VISA'), ('MASTERCARD', 'MASTERCARD'), ('AMEX', 'AMEX')]
    uid = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    cardNumber = models.CharField(max_length=16)
    type = models.CharField(max_length=10, choices=CARD_TYPE)
    isDefault = models.BooleanField()

    class Meta:
        unique_together = (('uid', 'cardNumber'),)


class Transaction(models.Model):
    # since Transaction is not a weak entity, tid itself is enough for primary key
    tid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    sid = models.ForeignKey(Shoe, null=True, on_delete=models.SET_NULL)
    datetime = models.DateTimeField()
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    address = models.TextField()
    payMethod = models.ForeignKey(PaymentMethod, null=True, on_delete=models.SET_NULL)


class AddressBook(models.Model):
    uid = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    address = models.TextField()
    isDefault = models.BooleanField()

    class Meta:
        unique_together = (('uid', 'address'),)
