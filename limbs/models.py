from django.contrib.auth import get_user_model
from django.db import models
from songs.models import Song
from events.models import Event

User = get_user_model()


class Limb(models.Model):
    cover = models.ImageField(upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    use_currently_playing = models.BooleanField(default=True)
    name = models.CharField(default='', max_length=255)
    song_list = models.ForeignKey(Song, null=True, on_delete=models.CASCADE)
    event_list = models.ManyToManyField(Event)

    def __str__(self):
        return str(self.created_by) + "'s limb created at " + str(self.created_at)
