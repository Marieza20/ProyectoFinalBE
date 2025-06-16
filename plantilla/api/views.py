from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from .models import (
    Pymes, Categorias, RedesSociales, Seguidores, PerfilPymes, PerfilRedes,
    Publicaciones, Publi_Categorias, Reacciones, Calificaciones, Imagenes
)
from .serializers import (
    PymesSerializer, CategoriasSerializer, RedesSocialesSerializer, SeguidoresSerializer,
    PerfilPymesSerializer, PerfilRedesSerializer, PublicacionesSerializer, PubliCategoriasSerializer,
    ReaccionesSerializer, CalificacionesSerializer, UsersSerializers, ImagenesSerializer, PymeDetalleSerializer
)
from django.contrib.auth.models import User
from .permission import IsAdminUserGroup, IsNormalUserGroup, IsPymeUserGroup
from rest_framework.permissions import BasePermission
from rest_framework import status
from rest_framework.response import Response


class IsAuthenticatedUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


class PymesViewSet(ModelViewSet):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)


class PymesListCreateView(ListCreateAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticatedUser]
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class PymesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticatedUser]
    
    def get_queryset(self):
        return Pymes.objects.filter(usuario=self.request.user)



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
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        data = request.data.copy()

        for campo in ['fotoPerfil', 'fotoPortada']:
            if campo not in data or not data.get(campo):
                if campo in data:
                    data.pop(campo)

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)



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
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Validación robusta
        if not hasattr(instance, 'pyme') or not instance.pyme or not hasattr(instance.pyme, 'usuario') or not instance.pyme.usuario:
            return Response({'detail': 'Publicación sin dueño asignado.'}, status=status.HTTP_400_BAD_REQUEST)
        if instance.pyme.usuario != request.user:
            return Response({'detail': 'No tienes permiso para eliminar esta publicación.'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)



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


 
# Imagenes
class ImagenesListCreateView(ListCreateAPIView):
    queryset = Imagenes.objects.all()
    serializer_class = ImagenesSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticatedUser]

class ImagenesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Imagenes.objects.all()
    serializer_class = ImagenesSerializer
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticatedUser]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        data = request.data.copy()

        for campo in ['imagen1', 'imagen2', 'imagen3']:
            if campo not in data or not data.get(campo):
                if campo in data:
                    data.pop(campo)

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

 
class PymesDetallesListCreateView(generics.ListAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymeDetalleSerializer
    
class PymeDetalleRetrieveView(generics.RetrieveAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymeDetalleSerializer