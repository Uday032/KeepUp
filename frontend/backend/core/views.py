from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from .models import Userid, PublisherId, AuthorId
from .serializers import UserSerializer, PublisherSerializer, Authorerializer

# Create your views here.
class UserSet(APIView):

    def get(self, request, format=None):
        user = Userid.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = Userid.objects.filter(userid= request.data['userid'])
        serializeruser = UserSerializer(user, many=True)
        if(len(serializeruser.data)==0):
            serializer = UserSerializer(data=request.data)
            if(serializer.is_valid()):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error': 'Error saving the user'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'User ID Already Added'})

class PublisherSet(APIView):

    def get(self, request, format=None):
        publisher = PublisherId.objects.all()
        serializer = PublisherSerializer(publisher, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = PublisherId.objects.filter(userid= request.data['userid'])
        serializeruser = UserSerializer(user, many=True)
        if(len(serializeruser.data)==0):
            serializer = PublisherSerializer(data=request.data)
            if(serializer.is_valid()):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error': 'Error saving the Publisher'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Publisher ID Already Added'})

