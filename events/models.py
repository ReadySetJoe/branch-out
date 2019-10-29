from django.db import models


class Event(models.Model):
    venue = models.CharField(max_length=255)
    url = models.URLField()
    price = models.FloatField()
    date = models.DateField()
    artist = models.CharField(max_length=255)