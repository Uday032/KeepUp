from django.urls import path
from .views import UserSet, PublisherSet, AuthorSet, AuthorFollowSet, PublisherFollowSet


urlpatterns = [
    path('users/', UserSet.as_view()),
    path('publisher/', PublisherSet.as_view()),
    path('author/', AuthorSet.as_view()),
    path('followauthor/', AuthorFollowSet.as_view()),
    path('followpublisher/', PublisherFollowSet.as_view())
]