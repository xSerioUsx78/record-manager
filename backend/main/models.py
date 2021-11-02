from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.


User = get_user_model()


class Record(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=50)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        return self.title