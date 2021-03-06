from django.contrib import admin

# Register your models here.
from .models import Userid, PublisherId, AuthorId, FollowPublisher, FollowAuthor, Articles

admin.site.register(Userid)
admin.site.register(PublisherId)
admin.site.register(AuthorId)
admin.site.register(FollowPublisher)
admin.site.register(FollowAuthor)
admin.site.register(Articles)