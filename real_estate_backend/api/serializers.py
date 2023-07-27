from rest_framework import serializers

from listings.models import Listing
from users.models import Dashboard


class ListingSerializer(serializers.ModelSerializer):
    realtor = serializers.SerializerMethodField()

    class Meta:
        model = Listing
        fields = '__all__'

    def get_realtor(self, obj):
        return f"{obj.realtor}"


class PropertyVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = '__all__'
