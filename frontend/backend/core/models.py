from django.db import models

# Create your models here.
class Userid(models.Model):
    userid = models.CharField(max_length=50, unique=True)

class PublisherId(models.Model):
    userid = models.CharField(max_length=50, unique=True)

class AuthorId(models.Model):
    userid = models.CharField(max_length=50, unique=True)
    publisher = models.ForeignKey(PublisherId, on_delete=models.CASCADE, blank=True, null=True)

class FollowPublisher(models.Model):
    followerid = models.ForeignKey(Userid, on_delete=models.CASCADE)
    followingid = models.ForeignKey(PublisherId, on_delete=models.CASCADE)

class FollowAuthor(models.Model):
    followerid = models.ForeignKey(Userid, on_delete=models.CASCADE)
    followingid = models.ForeignKey(AuthorId, on_delete=models.CASCADE)
