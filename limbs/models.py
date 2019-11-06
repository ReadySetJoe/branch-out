from django.contrib.auth import get_user_model
from django.db import models

from branches.models import Branch

User = get_user_model()


class Limb(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    branch = models.ForeignKey(Branch, null=True, on_delete=models.CASCADE)

    artist_url = models.CharField(max_length=255)
    artist_id = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255)

    event_id = models.IntegerField()
    event_name = models.CharField(max_length=255)
    event_uri = models.CharField(max_length=255)
    event_city = models.CharField(max_length=255)
    event_date = models.DateField()

    venue_name = models.CharField(max_length=255)
    venue_id = models.IntegerField()
    venue_url = models.CharField(max_length=255)

    song_url = models.CharField(max_length=255)
    song_name = models.CharField(max_length=255)
    song_preview_url = models.CharField(max_length=255)

    def __str__(self):
        return self.event_name + " created at " + str(self.created_at)
