from django.urls import path, include
# from rest_framework.routers import SimpleRouter

from . import views

# router = SimpleRouter()
# # navigate to api/v1/bands/
# router.register('bands', views.BoardViewSet, base_name='boards')
# urlpatterns = router.urls

urlpatterns = [
    path('limb/', views.LimbListCreateAPIView.as_view(), name='limb_create'),
    path('limbs/', views.LimbViewSet.as_view({'get': 'user'})),
    path('limb/<int:pk>/', views.LimbRetrieveUpdateDestroyAPIView.as_view(), name='limb_retrieve_update_destroy'),

    path('branch/', views.BranchListCreateAPIView.as_view(), name='branch_create'),
    path('branches/', views.BranchViewSet.as_view({'get': 'user'})),
    path('branch/<int:pk>/', views.BranchRetrieveUpdateDestroyAPIView.as_view(), name='branch_retrieve_update_destroy'),

    path('user-social-auth/', views.UserSocialAuthViewSet.as_view({'get': 'user'})),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
]
