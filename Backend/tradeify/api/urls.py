from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
        path('create_user', views.Create_User, name='create_user'),
        path('login_user', views.Login_User, name='login_user')
]