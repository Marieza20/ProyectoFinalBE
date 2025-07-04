from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import Group
from .models import (
    Pymes, Categorias, RedesSociales, Seguidores, PerfilPymes, PerfilRedes,
    Publicaciones, Publi_Categorias, Reacciones, Calificaciones, Imagenes
)
from .serializers import (
    PymesSerializer, CategoriasSerializer, RedesSocialesSerializer, SeguidoresSerializer,
    PerfilPymesSerializer, PerfilRedesSerializer, PublicacionesSerializer, PubliCategoriasSerializer,
    ReaccionesSerializer, CalificacionesSerializer, UsersSerializers, ImagenesSerializer, PymeDetalleSerializer, UserGroupSerializer
)
from django.contrib.auth.models import User
from .permission import IsAdminUserGroup, IsNormalUserGroup, IsPymeUserGroup
from rest_framework.permissions import BasePermission
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

userGroup = User.groups.through

class UserGroupView(ListCreateAPIView):
    queryset = userGroup.objects.all()
    serializer_class = UserGroupSerializer
    
class IsAuthenticatedUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    
class MiPymeView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        try:
            pyme = request.user.pyme
            serializer = PymesSerializer(pyme)
            return Response(serializer.data)
        except Pymes.DoesNotExist:
            return Response({"detail": "No tiene pyme asociada."}, status=404)
   
class UserMeView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        serializer = UsersSerializers(request.user)
        return Response(serializer.data)
    
class PymesViewSet(ModelViewSet):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)
    #permission_classes = [IsAuthenticatedUser, IsPymeUserGroup]

class PymesListCreateView(ListCreateAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class PymesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymesSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedUser, IsPymeUserGroup]
    
    def get_queryset(self):
        return Pymes.objects.filter(usuario=self.request.user)

# Categorias
class CategoriasListCreateView(ListCreateAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer
    permission_classes = [IsAuthenticatedUser, IsPymeUserGroup]

class CategoriasRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer
    permission_classes = [IsAuthenticatedUser, IsAdminUserGroup]

# RedesSociales
class RedesSocialesListCreateView(ListCreateAPIView):
    queryset = RedesSociales.objects.all()
    serializer_class = RedesSocialesSerializer
    permission_classes = [IsAuthenticatedUser]

class RedesSocialesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = RedesSociales.objects.all()
    serializer_class = RedesSocialesSerializer
    permission_classes = [IsAuthenticatedUser, IsAdminUserGroup]

# Seguidores
class SeguidoresListCreateView(ListCreateAPIView):
    queryset = Seguidores.objects.all()
    serializer_class = SeguidoresSerializer
    permission_classes = [IsAuthenticatedUser]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        id_pyme = self.request.query_params.get('id_pyme')
        id_usuario = self.request.query_params.get('id_usuario')
        if id_pyme is not None:
            queryset = queryset.filter(id_pyme=id_pyme)
        if id_usuario is not None:
            queryset = queryset.filter(id_usuario=id_usuario)
        return queryset

class SeguidoresRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Seguidores.objects.all()
    serializer_class = SeguidoresSerializer
    permission_classes = [IsAuthenticatedUser]
    
    #def get_queryset(self):
        #queryset = super().get_queryset()
        #id_pyme = self.request.query_params.get('id_pyme')
        #id_usuario = self.request.query_params.get('id_usuario')
        #if id_pyme is not None:
            #queryset = queryset.filter(id_pyme=id_pyme)
        #if id_usuario is not None:
            #queryset = queryset.filter(id_usuario=id_usuario)
        #return queryset

# PerfilPymes
class PerfilPymesListCreateView(ListCreateAPIView):
    queryset = PerfilPymes.objects.all()
    serializer_class = PerfilPymesSerializer
    permission_classes = [IsAuthenticatedUser]

class PerfilPymesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = PerfilPymes.objects.all()
    serializer_class = PerfilPymesSerializer
    permission_classes = [IsAuthenticatedUser]
    
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
    permission_classes = [IsAuthenticatedUser]

class PerfilRedesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = PerfilRedes.objects.all()
    serializer_class = PerfilRedesSerializer
    permission_classes = [IsAuthenticatedUser]

# Publicaciones
class PublicacionesListCreateView(ListCreateAPIView):
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer
    permission_classes = [IsAuthenticatedUser]

class PublicacionesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Publicaciones.objects.all()
    serializer_class = PublicacionesSerializer
    permission_classes = [IsAuthenticatedUser]
    
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
    permission_classes = [IsAuthenticatedUser]

class PubliCategoriasRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Publi_Categorias.objects.all()
    serializer_class = PubliCategoriasSerializer
    permission_classes = [IsAuthenticatedUser]

# Reacciones
class ReaccionesListCreateView(ListCreateAPIView):
    queryset = Reacciones.objects.all()
    serializer_class = ReaccionesSerializer
    permission_classes = [IsAuthenticatedUser]

class ReaccionesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Reacciones.objects.all()
    serializer_class = ReaccionesSerializer
    permission_classes = [IsAuthenticatedUser]

# Calificaciones
class CalificacionesListCreateView(ListCreateAPIView):
    queryset = Calificaciones.objects.all()
    serializer_class = CalificacionesSerializer
    permission_classes = [IsAuthenticatedUser]

class CalificacionesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Calificaciones.objects.all()
    serializer_class = CalificacionesSerializer
    permission_classes = [IsAuthenticatedUser]

class UsersListCreateView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializers
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticatedUser()]

    def perform_create(self, serializer):
        user = serializer.save()
        # Asigna el grupo IsNormalUserGroup por defecto
        try:
            group = Group.objects.get(name="IsNormalUserGroup")
            user.groups.add(group)
        except Group.DoesNotExist:
            pass 
        
class UsersRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializers
    permission_classes = [IsAuthenticatedUser]

# Imagenes
class ImagenesListCreateView(ListCreateAPIView):
    queryset = Imagenes.objects.all()
    serializer_class = ImagenesSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedUser]

class ImagenesRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Imagenes.objects.all()
    serializer_class = ImagenesSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticatedUser]

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
    permission_classes = [AllowAny]
    
    
class PymeDetalleRetrieveView(generics.RetrieveAPIView):
    queryset = Pymes.objects.all()
    serializer_class = PymeDetalleSerializer
    permission_classes = [IsAuthenticatedUser]

class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logout successful"})
        response.delete_cookie('access')  # nombre de la cookie JWT
        response.delete_cookie('refresh')
        return response
    
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

        data = serializer.validated_data
        user = serializer.user  # usuario autenticado

        response = Response(data, status=status.HTTP_200_OK)

        # Guardamos las cookies necesarias
        response.set_cookie('access', data['access'], httponly=True, samesite='Lax')
        response.set_cookie('refresh', data['refresh'], httponly=True, samesite='Lax')
        response.set_cookie('user_id', str(user.id), httponly=True, samesite='Lax')

        return response