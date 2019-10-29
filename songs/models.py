from django.db import models


class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    track_number = models.SmallIntegerField(default=1)
    url = models.URLField()

    def __str__(self):
        return self.title + ' by ' + self.artist
