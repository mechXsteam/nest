from django.contrib.auth.models import User
from django.db import models

from realtors.models import Realtor


# Create your models here.

class Listing(models.Model):
    realtor = models.ForeignKey(Realtor, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=300, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=3, null=True, blank=True)
    choices_property_status = (
        ('Sale', 'Sale'),
        ('Rent', 'Rent'),
    )
    property_status = models.CharField(max_length=20, blank=True, null=True, choices=choices_property_status)
    rooms = models.IntegerField(blank=True, null=True)
    furnished = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    cctv = models.BooleanField(default=False)
    parking = models.BooleanField(default=False)
    date_posted = models.DateTimeField(auto_now_add=True)
    lattitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    picture1 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d")
    picture2 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d")
    picture3 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d")
    picture4 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d")

    def __str__(self):
        return self.title
