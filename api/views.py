from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .permissions import IsOwnerOrReadOnly
from .serializers import SongSerializer
from songs.models import Song


class SongListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# class BoardRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsOwnerOrReadOnly,)
#     queryset = Board.objects.all()
#     serializer_class = BoardSerializer
#
#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)
#
#
# # class BoardViewSet(viewsets.ModelViewSet):
# #     permission_classes = (IsOwnerOrReadOnly,)
# #     queryset = Board.objects.all()
# #     serializer_class = BoardSerializer
#
#

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })

