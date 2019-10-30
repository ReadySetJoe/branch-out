from rest_framework import serializers

from songs.models import Song


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        pass
        # model = Board
        # depth = 1
        # fields = ('id', 'image', 'caption', 'created_by')


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        depth = 1
        fields = '__all__'
