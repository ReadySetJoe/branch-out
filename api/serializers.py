from rest_framework import serializers
from social_django.models import UserSocialAuth

from limbs.models import Limb
from branches.models import Branch


class LimbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Limb
        depth = 1
        fields = '__all__'


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        depth = 1
        fields = '__all__'


class UserSocialAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialAuth
        depth = 1
        fields = '__all__'
