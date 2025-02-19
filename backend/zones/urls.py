from django.urls import path
from .views import zones_api

urlpatterns = [
    path('', zones_api, name='zones_api'),
]
