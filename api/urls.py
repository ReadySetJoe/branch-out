from django.urls import path, include
# from rest_framework.routers import SimpleRouter

from . import views

# router = SimpleRouter()
# # navigate to api/v1/boards/
# router.register('boards', views.BoardViewSet, base_name='boards')
# urlpatterns = router.urls

urlpatterns = [
    path('limb/', views.LimbListCreateAPIView.as_view(), name='limb_create'),
    path('branch/', views.BranchListCreateAPIView.as_view(), name='branch_create'),
    path('branch/<int:pk>/', views.BranchRetrieveUpdateDestroyAPIView.as_view(), name='branch_retrieve_update_destroy'),

    # path('user-social-auth/', views.UserSocialAuthRetrieveAPIView.as_view(), name='retrieve'),
    path('user-social-auth/', views.UserSocialAuthViewSet.as_view({'get': 'user'})),
]
