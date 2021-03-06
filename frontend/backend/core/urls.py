from django.urls import path
from .views import (UserSet, PublisherSet, AuthorSet, AuthorFollowSet, 
                    PublisherFollowSet, GetAuthorsFromPublishersSet,
                    ArticleSet, author, publisher, getfollowedarticles)


urlpatterns = [
    path('users/', UserSet.as_view()),
    path('publisher/', PublisherSet.as_view()),
    path('author/', AuthorSet.as_view()),
    path('followauthor/', AuthorFollowSet.as_view()),
    path('followpublisher/', PublisherFollowSet.as_view()),
    path('getauthours/<int:pid>', GetAuthorsFromPublishersSet.as_view()),
    path('articles/', ArticleSet.as_view()),
    path('getarticles/author/<int:authorid>', author),
    path('getarticles/publisher/<int:publisherid>', publisher),
    path('getarticles/<int:userid>', getfollowedarticles)
]