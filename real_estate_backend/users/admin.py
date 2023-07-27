from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import Dashboard


admin.site.register(Dashboard)
