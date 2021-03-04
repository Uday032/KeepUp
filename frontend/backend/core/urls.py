from django.urls import path
from .views import UserSet, PublisherSet


urlpatterns = [
    path('users/', UserSet.as_view()),
    path('publisher/', PublisherSet.as_view())
]