from rest_framework import serializers
from social_django.models import UserSocialAuth
import json

from limbs.models import Limb
from branches.models import Branch


class LimbSerializer(serializers.ModelSerializer):
    class Meta:
        model = Limb
        depth = 1
        fields = ['artist_url', 'artist_id', 'artist_name',
                  'event_id', 'event_name', 'event_city', 'event_date', 'event_uri',
                  'venue_name', 'venue_id', 'venue_url',
                  'song_url', 'song_name', 'song_preview_url', ]


class BranchSerializer(serializers.ModelSerializer):
    limbs = serializers.ListField(write_only=True)

    class Meta:
        model = Branch
        depth = 1
        # fields = ['cover']
        fields = ['cover', 'limbs']

    def create(self, validated_data):
        # import pdb
        # pdb.set_trace()

        limbs_data = validated_data.pop('limbs')
        # limbs_data = limbs_data[0].split('{')
        # limbs_data.pop(0)
        # limbs_data = list(map(lambda x: '{' + x[:-1], limbs_data))
        # # limbs_data[len(limbs_data)-1] = limbs_data[len(limbs_data)-1] + '}'
        # limbs_data = list(map(lambda x: json.loads(x), limbs_data))
        limbs_data = json.loads(self.context['request'].data['limbs'])

        branch = Branch.objects.create(**validated_data)
        for limb_data in limbs_data:
            Limb.objects.create(branch=branch, created_by=validated_data['created_by'], **limb_data)
        return branch


class UserSocialAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialAuth
        depth = 1
        fields = '__all__'
