from django.urls import path, include
# from rest_framework.routers import SimpleRouter

from . import views

# router = SimpleRouter()
# # navigate to api/v1/boards/
# router.register('boards', views.BoardViewSet, base_name='boards')
# urlpatterns = router.urls

urlpatterns = [
    # path('boards/<int:pk>/', views.BoardRetrieveUpdateDestroyAPIView.as_view(), name='board_create'),
    path('songs/', views.SongListCreateAPIView.as_view(), name='song_create'),
]
