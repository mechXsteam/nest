from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

# Create your models here.


class Dashboard(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    favorite_listings = models.TextField(max_length=500, null=True, blank=True)
    fixVisit = models.BooleanField(default=False)
    property_visit_date = models.DateTimeField(blank=True, null=True)
    contact = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.user} dashboard"


@receiver(post_save, sender=User)
def create_dashboard(sender, instance, created, **kwargs):
    if created:
        user_dashboard = Dashboard(user=instance)
        user_dashboard.save()
