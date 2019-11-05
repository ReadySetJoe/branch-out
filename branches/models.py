from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Branch(models.Model):
    cover = models.ImageField(upload_to='images/', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE)


