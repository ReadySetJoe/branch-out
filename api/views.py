from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from social_django.models import UserSocialAuth

from .permissions import IsOwnerOrReadOnly
from .serializers import UserSocialAuthSerializer, LimbSerializer, BranchSerializer
from limbs.models import Limb
from branches.models import Branch


class LimbListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Limb.objects.all()
    serializer_class = LimbSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class LimbRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Limb.objects.all()
    serializer_class = LimbSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class LimbViewSet(viewsets.ViewSet):
    def user(self, request):
        queryset = Limb.objects.filter(created_by=request.user)
        serializer = LimbSerializer(queryset, many=True)
        return Response(serializer.data)


class BranchListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class BranchRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class BranchViewSet(viewsets.ViewSet):
    def user(self, request):
        queryset = Branch.objects.filter(created_by=request.user)
        serializer = BranchSerializer(queryset, many=True)
        return Response(serializer.data)


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
        # import pdb
        # pdb.set_trace()
        queryset = UserSocialAuth.objects.filter(user=request.user)
        serializer = UserSocialAuthSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = UserSocialAuth.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSocialAuthSerializer(user)
        return Response(serializer.data)