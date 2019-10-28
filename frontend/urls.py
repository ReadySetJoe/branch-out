from django.urls import path, include, re_path

from .views import *


urlpatterns = [
    # re_path(r'^(?:.*)/?$', IndexView.as_view(), name='frontend_routes'),
    # path('', IndexView.as_view(), name='index'),
    path('', index, name='index'),
]
