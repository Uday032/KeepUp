from rest_framework import serializers
from .models import Userid, PublisherId, AuthorId, FollowAuthor, FollowPublisher, Articles

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userid
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublisherId
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorId
        fields = '__all__'

class FollowAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowAuthor
        fields = '__all__'

class FollowPublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowPublisher
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = '__all__'

        