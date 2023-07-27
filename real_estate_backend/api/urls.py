from django.urls import path, include

import api.views
from . import views

urlpatterns = [
    path('', views.ListingList.as_view()),
    path('user/', include('users.urls')),
    path('api/token/', api.views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('property_visit/<int:user>/', views.PropertyVisitView.as_view(), name='property-visit'),
]
