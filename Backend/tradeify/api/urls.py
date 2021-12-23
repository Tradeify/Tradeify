from django.urls import path
from django.urls.resolvers import URLPattern

from . import views, tradenotes_functions

urlpatterns = [
        path('create_user', views.Create_User, name='create_user'),
        path('login_user', views.Login_User, name='login_user'),
        path('create_tradenote', tradenotes_functions.create_Tradenote, name='create_tradenote'),
        path('get_tradenote/<int:tradenote_id>', tradenotes_functions.get_Tradenote, name='get_tradenote')
]