from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100, null=False)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    token = models.CharField(max_length=500, null=True, default="")

    def __str__(self):
        return "{} -{}".format(self.name, self.email)
