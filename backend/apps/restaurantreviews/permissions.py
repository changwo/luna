from rest_framework.permissions import BasePermission


class IsAuthorOrAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return obj.author == request.user or request.user.is_staff


class CannotLikeOwnReview(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author != request.user
