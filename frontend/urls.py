from django.urls import path, include, re_path

from . import views


urlpatterns = [
    # re_path(r'^(?:.*)/?$', IndexView.as_view(), name='frontend_routes'),
    path('', views.IndexView.as_view(), name='landing'),
    path('register-by-token/<str:backend>/<str:access_token>/', views.register_by_access_token, name='register-by-token'),
]
