from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from listings.models import Listing
from users.models import Dashboard
from .serializers import ListingSerializer, PropertyVisitSerializer


# Create your views here.
class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class PropertyVisitView(generics.RetrieveUpdateAPIView):
    queryset = Dashboard.objects.all()
    serializer_class = PropertyVisitSerializer
    lookup_field = 'user'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims: these data will be encrypted in the jwt decode
        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
