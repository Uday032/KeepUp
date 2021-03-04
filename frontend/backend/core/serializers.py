from rest_framework import serializers
from .models import Userid, PublisherId, AuthorId

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userid
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublisherId
        fields = '__all__'

class Authorerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorId
        fields = '__all__'