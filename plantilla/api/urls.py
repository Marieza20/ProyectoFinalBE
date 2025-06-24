from django.urls import path
from .views import (
    UsersListCreateView, UsersRetrieveUpdateDestroyView,
    PymesListCreateView, PymesRetrieveUpdateDestroyView,
    CategoriasListCreateView, CategoriasRetrieveUpdateDestroyView,
    LogoutView,
    RedesSocialesListCreateView, RedesSocialesRetrieveUpdateDestroyView,
    SeguidoresListCreateView, SeguidoresRetrieveUpdateDestroyView,
    PerfilPymesListCreateView, PerfilPymesRetrieveUpdateDestroyView,
    PerfilRedesListCreateView, PerfilRedesRetrieveUpdateDestroyView,
    PublicacionesListCreateView, PublicacionesRetrieveUpdateDestroyView,
    PubliCategoriasListCreateView, PubliCategoriasRetrieveUpdateDestroyView,
    ReaccionesListCreateView, ReaccionesRetrieveUpdateDestroyView,
    CalificacionesListCreateView, CalificacionesRetrieveUpdateDestroyView,
    ImagenesListCreateView, ImagenesRetrieveUpdateDestroyView,
    PymesDetallesListCreateView, PymeDetalleRetrieveView, CustomTokenObtainPairView, UserMeView,
)

urlpatterns = [
    path('users/', UsersListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UsersRetrieveUpdateDestroyView.as_view(), name='user-detail'),
    path('users/me/', UserMeView.as_view(), name='user-me'),
    
    path('pymes/', PymesListCreateView.as_view(), name='pymes-list-create'),
    path('pymes/<int:pk>/', PymesRetrieveUpdateDestroyView.as_view(), name='pymes-detail'),
    
    path('categorias/', CategoriasListCreateView.as_view(), name='categorias-list-create'),
    path('categorias/<int:pk>/', CategoriasRetrieveUpdateDestroyView.as_view(), name='categorias-detail'),
    
    path('redes/', RedesSocialesListCreateView.as_view(), name='redes-list-create'),
    path('redes/<int:pk>/', RedesSocialesRetrieveUpdateDestroyView.as_view(), name='redes-detail'),
    
    path('seguidores/', SeguidoresListCreateView.as_view(), name='seguidores-list-create'),
    path('seguidores/<int:pk>/', SeguidoresRetrieveUpdateDestroyView.as_view(), name='seguidores-detail'),
    
    path('perfil-pymes/', PerfilPymesListCreateView.as_view(), name='perfilpymes-list-create'),
    path('perfil-pymes/<int:pk>/', PerfilPymesRetrieveUpdateDestroyView.as_view(), name='perfilpymes-detail'),
    
    path('perfil-redes/', PerfilRedesListCreateView.as_view(), name='perfilredes-list-create'),
    path('perfil-redes/<int:pk>/', PerfilRedesRetrieveUpdateDestroyView.as_view(), name='perfilredes-detail'),
    
    path('publicaciones/', PublicacionesListCreateView.as_view(), name='publicaciones-list-create'),
    path('publicaciones/<int:pk>/', PublicacionesRetrieveUpdateDestroyView.as_view(), name='publicaciones-detail'),
    
    path('publi-categorias/', PubliCategoriasListCreateView.as_view(), name='publicategorias-list-create'),
    path('publi-categorias/<int:pk>/', PubliCategoriasRetrieveUpdateDestroyView.as_view(), name='publicategorias-detail'),
    
    path('reacciones/', ReaccionesListCreateView.as_view(), name='reacciones-list-create'),
    path('reacciones/<int:pk>/', ReaccionesRetrieveUpdateDestroyView.as_view(), name='reacciones-detail'),
    
    path('calificaciones/', CalificacionesListCreateView.as_view(), name='calificaciones-list-create'),
    path('calificaciones/<int:pk>/', CalificacionesRetrieveUpdateDestroyView.as_view(), name='calificaciones-detail'),
    
    path('imagenes/', ImagenesListCreateView.as_view(), name='imagenes-list-create'),
    path('imagenes/<int:pk>/', ImagenesRetrieveUpdateDestroyView.as_view(), name='imagenes-detail'),
    
    path('pymes-detalles/', PymesDetallesListCreateView.as_view(), name='pymes-detalles'),
    path('pymes-detalles/<int:pk>/', PymeDetalleRetrieveView.as_view(), name='pyme-detalles'),
    
    path('logout/', LogoutView.as_view()),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]

urlpatterns2 = [
    path('categorias/', CategoriasListCreateView.as_view(), name='categorias-list-create'),
    path('categorias/<int:pk>/', CategoriasRetrieveUpdateDestroyView.as_view(), name='categorias-detail'),
]