from rest_framework.permissions import BasePermission

# Permiso para administradores (grupo "admin")
class IsAdminUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="IsAdminUserGroup").exists()

# Permiso para usuarios normales (grupo "usuario")
class IsNormalUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="IsNormalUserGroup").exists()

# Permiso para pymes (grupo "pyme")
class IsPymeUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="IsPymeUserGroup").exists()