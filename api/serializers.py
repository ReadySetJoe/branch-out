from rest_framework import serializers
from social_django.models import UserSocialAuth

from songs.models import Song


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        depth = 1
        fields = ['title', 'artist', 'track_number', 'url', 'duration_ms']


class UserSocialAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialAuth
        depth = 1
        fields = '__all__'
