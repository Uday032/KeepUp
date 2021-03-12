from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Q, Count

from rest_framework import status
from rest_framework.decorators import api_view, APIView, action
from rest_framework.response import Response
from .models import Userid, PublisherId, AuthorId, FollowAuthor, FollowPublisher, Articles
from .serializers import UserSerializer, PublisherSerializer, AuthorSerializer, FollowAuthorSerializer, FollowPublisherSerializer, ArticleSerializer

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

class AuthorSet(APIView):

    def get(self, request, format=None):
        author = AuthorId.objects.all()
        serializer = AuthorSerializer(author, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = AuthorId.objects.filter(userid= request.data['userid'])
        serializeruser = AuthorSerializer(user, many=True)
        if(len(serializeruser.data)==0):
            serializer = AuthorSerializer(data=request.data)
            if(serializer.is_valid()):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error': 'Error saving the Author'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Author ID Already Added'})

class AuthorFollowSet(APIView):

    def get(self, request, format=None):
        author = FollowAuthor.objects.all()
        serializer = FollowAuthorSerializer(author, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = FollowAuthor.objects.filter(followerid= request.data['followerid'], followingid= request.data['followingid'])
        serializeruser = FollowAuthorSerializer(user, many=True)
        if(len(serializeruser.data)==0):
            serializer = FollowAuthorSerializer(data=request.data)
            if(serializer.is_valid()):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error': 'Error adding to databse'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'User has already followed the author'})


class PublisherFollowSet(APIView):

    def get(self, request, format=None):
        publisher = FollowPublisher.objects.all()
        serializer = FollowPublisherSerializer(publisher, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = FollowPublisher.objects.filter(followerid= request.data['followerid'], followingid= request.data['followingid'])
        serializeruser = FollowPublisherSerializer(user, many=True)
        if(len(serializeruser.data)==0):
            serializer = FollowPublisherSerializer(data=request.data)
            if(serializer.is_valid()):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error': 'Error adding to databse'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'User has already followed the Publisher'})

class GetAuthorsFromPublishersSet(APIView):

    def get(self, request, pid, format=None):
        author = AuthorId.objects.filter(publisher=pid)
        serializer = AuthorSerializer(author, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

class ArticleSet(APIView):

    def get(self, request, format=None):
        articles = Articles.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        # try:
        #     if(request.data['Postedbyauthor']!=None):
        #         articles = Articles.objects.filter(Postedbyauthor=request.data['Postedbyauthor'])
        #         serializer = ArticleSerializer(articles, many=True)
        #         if(len(serializer.data)):
        #             return Response({'error': 'Author can only publish one article'})
        # except:
        #     pass
            
        articles = Articles.objects.filter(ArticleTitle=request.data['ArticleTitle'])
        serializertitle = ArticleSerializer(articles, many=True)
        if(len(serializertitle.data)==0):
            serializer = ArticleSerializer(data=request.data)
            if(serializer.is_valid()):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error': 'Error saving the Article'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'This article is already published'})
    
    
@api_view(['GET'])
def author(request, authorid):
    articles = Articles.objects.filter(Postedbyauthor=authorid)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def publisher(request, publisherid):
    articles = Articles.objects.filter(Postedbypublisher=publisherid)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getfollowedarticles(request, userid):

    followed_publisher = FollowPublisher.objects.filter(followerid=userid).values_list('followingid', flat=True)

    followedauthor = FollowAuthor.objects.filter(followerid=userid).values_list('followingid', flat=True)

    articles = Articles.objects.filter(Q(Postedbyauthor__in=list(followedauthor)) | Q(Postedbypublisher__in=list(followed_publisher)))

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def gettoparticle(request):
    author = list(PublisherId.objects.annotate(authorcount=Count('authorid')).order_by('-authorcount').values())

    data = []
    articleid = []

    count = 0
    
    for i in range(len(author)):
        try: 
            if(i==i+1):
                break
        except:
            pass
        articles = Articles.objects.filter(Postedbypublisher=author[i]["id"])
        selectedid = Articles.objects.filter(Postedbypublisher=author[i]["id"]).values_list('id', flat=True)
        serializer = ArticleSerializer(articles, many=True)
        data = data + serializer.data
        articleid = articleid + list(selectedid)

    if(len(data)<10):
        authorarticles = list(AuthorId.objects.annotate(articlecount=Count('articles')).order_by('-articlecount').values())

        for i in range(len(authorarticles)):
            try: 
                if(i==i+1):
                    break
            except:
                pass
            articles = Articles.objects.filter(Postedbyauthor=authorarticles[i]["id"])
            selectedid = Articles.objects.filter(Postedbyauthor=authorarticles[i]["id"]).values_list('id', flat=True)
            serializer = ArticleSerializer(articles, many=True)
            data = data + serializer.data
            articleid = articleid + list(selectedid)
    print(articleid)
    if(len(data)<10):
        articles = Articles.objects.filter(~Q(id__in=articleid)).order_by('date')
        print(articles.query)
        serializer = ArticleSerializer(articles, many=True)
        data = data + serializer.data
    return Response(data[:10], status=status.HTTP_200_OK)
