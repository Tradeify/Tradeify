from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
        path('create_profile', views.Create_Profile, name='create_profile'),
        
]