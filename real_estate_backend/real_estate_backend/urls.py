from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

import api.views

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/vi/', include('api.urls')),
                  path('api/token/', api.views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
                  path('', include_docs_urls(title='NEST API')),
                  path('schemas', get_schema_view(
                      title="NEST API",
                      description="Backend API for NEST",
                      version="1.0.0"
                  ), name='openapi-schema'),

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL,
                                                                                         document_root=settings.STATIC_ROOT)
