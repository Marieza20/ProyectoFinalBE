from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets as genericAPI
from .models import (
    Pymes, Categorias, RedesSociales, Seguidores, PerfilPymes, PerfilRedes,
    Publicaciones, Publi_Categorias, Reacciones, Calificaciones
)
from .serializers import (
    PymesSerializer, CategoriasSerializer, RedesSocialesSerializer, SeguidoresSerializer,
    PerfilPymesSerializer, PerfilRedesSerializer, PublicacionesSerializer, PubliCategoriasSerializer,
    ReaccionesSerializer, CalificacionesSerializer, UsersSerializers
)
from django.contrib.auth.models import User
from .permission import IsAdminUserGroup, IsNormalUserGroup, IsPymeUserGroup
from rest_framework.permissions import BasePermission

class IsAuthenticatedUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

# Usuario
class PymesViewSet(genericAPI.ModelViewSet):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)

# Pymes
class PymesListCreateView(ListCreateAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticatedUser]

class PymesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticatedUser]

# Categorias
class CategoriasListCreateView(ListCreateAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer
    # permission_classes = [IsAuthenticatedUser]

class CategoriasRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer
    # permission_classes = [IsAuthenticatedUser]

# RedesSociales
class RedesSocialesListCreateView(ListCreateAPIView):
    queryset = RedesSociales.objects.all()
    serializer_class = RedesSocialesSerializer
    # permission_classes = [IsAuthenticatedUser]

class RedesSocialesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = RedesSociales.objects.all()
    serializer_class = RedesSocialesSerializer
    # permission_classes = [IsAuthenticatedUser]

# Seguidores
class SeguidoresListCreateView(ListCreateAPIView):
    queryset = Seguidores.objects.all()
    serializer_class = SeguidoresSerializer
    # permission_classes = [IsAuthenticatedUser]

class SeguidoresRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Seguidores.objects.all()
    serializer_class = SeguidoresSerializer
    # permission_classes = [IsAuthenticatedUser]

# PerfilPymes
class PerfilPymesListCreateView(ListCreateAPIView):
    queryset = PerfilPymes.objects.all()
    serializer_class = PerfilPymesSerializer
    # permission_classes = [IsAuthenticatedUser]

class PerfilPymesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = PerfilPymes.objects.all()
    serializer_class = PerfilPymesSerializer
    # permission_classes = [IsAuthenticatedUser]

# PerfilRedes
class PerfilRedesListCreateView(ListCreateAPIView):
    queryset = PerfilRedes.objects.all()
    serializer_class = PerfilRedesSerializer
    # permission_classes = [IsAuthenticatedUser]

class PerfilRedesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = PerfilRedes.objects.all()
    serializer_class = PerfilRedesSerializer
    # permission_classes = [IsAuthenticatedUser]

# Publicaciones
class PublicacionesListCreateView(ListCreateAPIView):
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer
    # permission_classes = [IsAuthenticatedUser]

class PublicacionesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer
    # permission_classes = [IsAuthenticatedUser]

# Publi_Categorias
class PubliCategoriasListCreateView(ListCreateAPIView):
    queryset = Publi_Categorias.objects.all()
    serializer_class = PubliCategoriasSerializer
    # permission_classes = [IsAuthenticatedUser]

class PubliCategoriasRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Publi_Categorias.objects.all()
    serializer_class = PubliCategoriasSerializer
    # permission_classes = [IsAuthenticatedUser]

# Reacciones
class ReaccionesListCreateView(ListCreateAPIView):
    queryset = Reacciones.objects.all()
    serializer_class = ReaccionesSerializer
    # permission_classes = [IsAuthenticatedUser]

class ReaccionesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Reacciones.objects.all()
    serializer_class = ReaccionesSerializer
    # permission_classes = [IsAuthenticatedUser]

# Calificaciones
class CalificacionesListCreateView(ListCreateAPIView):
    queryset = Calificaciones.objects.all()
    serializer_class = CalificacionesSerializer
    # permission_classes = [IsAuthenticatedUser]

class CalificacionesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Calificaciones.objects.all()
    serializer_class = CalificacionesSerializer
    # permission_classes = [IsAuthenticatedUser]

class UsersListCreateView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializers

class UsersRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializers