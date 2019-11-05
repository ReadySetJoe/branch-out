from rest_framework import generics, permissions, viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from social_django.models import UserSocialAuth

from .permissions import IsOwnerOrReadOnly
from .serializers import LimbSerializer, UserSocialAuthSerializer
from limbs.models import Limb


class LimbListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Limb.objects.all()
    serializer_class = LimbSerializer


class UserSocialAuthRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserSocialAuth.objects.all()
    serializer_class = UserSocialAuthSerializer


class UserSocialAuthViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving UserSocialAuths.
    """

    def list(self, request):
        queryset = UserSocialAuth.objects.all()
        serializer = UserSocialAuthSerializer(queryset, many=True)
        return Response(serializer.data)

    def user(self, request):
        queryset = UserSocialAuth.objects.filter(pk=request.user.pk)
        serializer = UserSocialAuthSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = UserSocialAuth.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSocialAuthSerializer(user)
        return Response(serializer.data)

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
