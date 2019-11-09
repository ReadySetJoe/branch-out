from django.urls import path, include, re_path

from . import views


urlpatterns = [
    re_path(r'^(?:.*)/?$', views.IndexView.as_view(), name='frontend_routes'),
    path('', views.IndexView.as_view(), name='index'),
]
