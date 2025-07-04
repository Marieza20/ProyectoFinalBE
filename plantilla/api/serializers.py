from rest_framework import serializers
from .models import Pymes, Categorias, RedesSociales, Seguidores, PerfilPymes, PerfilRedes, Imagenes, Publicaciones, Publi_Categorias, Reacciones, Calificaciones
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password

userGroup = User.groups.through
class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = userGroup
        fields = ['id', 'user', 'group'] 


class PymesSerializer(serializers.ModelSerializer):
    contrasena = serializers.CharField(min_length=6, write_only=True)
    usuario_id = serializers.IntegerField(source='usuario.id', read_only=True)
    
    class Meta:
        model = Pymes
        fields = ['id', 'username', 'nombre', 'telefono', 'correo', 'contrasena', 'carnet', 'usuario_id']
        extra_kwargs = {
            'usuario': {'write_only': True},  # ocultamos el objeto en respuesta
        }
        
    def validate_contrasena(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("La contraseña debe tener al menos 8 caracteres.")
        return value

    def validate_correo(self, value):
        if Pymes.objects.filter(correo=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value
    
    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('correo')
        password = validated_data.get('contrasena')
        
        
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            is_staff=True
        )
        
        try:
            grupo = Group.objects.get(id=3)
            user.groups.add(grupo)
        except Group.DoesNotExist:
            print("El grupo con ID 3 no existe.")
            
        print(user.id)
        validated_data['usuario'] = user
        validated_data.pop('contrasena', None)

        return super().create(validated_data)

class CategoriasSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=100)

    class Meta:
        model = Categorias
        fields = '__all__'
        
    def validate_nombre(self, value):
        if Categorias.objects.filter(nombre=value).exists():
            raise serializers.ValidationError("Ya existe una categoría con este nombre.")
        return value
    
class RedesSocialesSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=100)

    class Meta:
        model = RedesSociales
        fields = '__all__'
    
    def validate_nombre(self, value):
        if RedesSociales.objects.filter(nombre=value).exists():
            raise serializers.ValidationError("Ya existe una red social con este nombre.")
        return value

class SeguidoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seguidores
        fields = '__all__'

    def validate(self, data):
        if Seguidores.objects.filter(id_pyme=data['id_pyme'], id_usuario=data['id_usuario']).exists():
            raise serializers.ValidationError("Ya existe esta relación de seguidor.")
        return data

class PerfilPymesSerializer(serializers.ModelSerializer):
    descripcion = serializers.CharField()
    ubicacion = serializers.CharField()
    id_pyme = serializers.PrimaryKeyRelatedField(queryset=Pymes.objects.all(), required=False)

    class Meta:
        model = PerfilPymes
        fields = '__all__'

    def validate_descripcion(self, value):
        if not value.strip():
            raise serializers.ValidationError("La descripción no puede estar vacía.")
        return value

    def validate_ubicacion(self, value):
        if not value.strip():
            raise serializers.ValidationError("La ubicación no puede estar vacía.")
        return value
    
    def validate(self, data):
        if self.instance is None:
            if 'id_pyme' in data and PerfilPymes.objects.filter(id_pyme=data['id_pyme']).exists():
                raise serializers.ValidationError("Ya existe un perfil para esta pyme.")
        return data

class PerfilRedesSerializer(serializers.ModelSerializer):
    url = serializers.URLField()

    class Meta:
        model = PerfilRedes
        fields = '__all__'
        
    def validate_url(self, value):
        if not value.startswith(('http://', 'https://')):
            raise serializers.ValidationError("La URL debe comenzar con 'http://' o 'https://'.")
        return value

class ImagenesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagenes
        fields = '__all__'

    def validate(self, data):
        if Imagenes.objects.filter(id_publicacion=data['id_publicacion'], imagen=data['imagen']).exists():
            raise serializers.ValidationError("Esta imagen ya está asociada a la publicación.")
        return data
    
    def validate_imagen(self, value):
        if not value:
            raise serializers.ValidationError("La imagen no puede estar vacía.")
        if not value.name.lower().endswith(('.png', '.jpg', '.jpeg')):
            raise serializers.ValidationError("El archivo debe ser una imagen (PNG, JPG, JPEG).")
        return value

class PublicacionesSerializer(serializers.ModelSerializer):
    descripcion = serializers.CharField()
    pyme_nombre = serializers.CharField(source='id_pyme.nombre', read_only=True)
    pyme_fotoPerfil = serializers.SerializerMethodField()
    
    class Meta:
        model = Publicaciones
        fields = '__all__'

    def get_pyme_fotoPerfil(self, obj):
        perfil = PerfilPymes.objects.filter(id_pyme=obj.id_pyme).first()
        if perfil and perfil.fotoPerfil:
            return perfil.fotoPerfil.url
        return ''
    
    def validate_descripcion(self, value):
        if not value.strip():
            raise serializers.ValidationError("La descripción no puede estar vacía.")
        return value
    
class PubliCategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publi_Categorias
        fields = '__all__'

    def validate(self, data):
        if Publi_Categorias.objects.filter(id_publicacion=data['id_publicacion'], id_categoria=data['id_categoria']).exists():
            raise serializers.ValidationError("Esta relación ya existe.")
        return data
    
class ReaccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reacciones
        fields = '__all__'

    def validate(self, data):
        if Reacciones.objects.filter(id_publicacion=data['id_publicacion'], id_usuario=data['id_usuario']).exists():
            raise serializers.ValidationError("Ya existe esta reacción.")
        return data
    
class CalificacionesSerializer(serializers.ModelSerializer):
    Cantidad = serializers.IntegerField(min_value=1)

    class Meta:
        model = Calificaciones
        fields = '__all__'

    def validate_Cantidad(self, value):
        if value < 1:
            raise serializers.ValidationError("La cantidad debe ser positiva.")
        return value
    
class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class RedesSocialesNestedSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='id_redes.nombre')

    class Meta:
        model = PerfilRedes
        fields = ['nombre', 'url']
        
    def validate_url(self, value):
        if not value.startswith(('http://', 'https://')):
            raise serializers.ValidationError("La URL debe comenzar con 'http://' o 'https://'.")
        return value
        
class PymeDetalleSerializer(serializers.ModelSerializer):
    perfil = serializers.SerializerMethodField()
    imagenes = serializers.SerializerMethodField()
    redes = serializers.SerializerMethodField()
    publicaciones = serializers.SerializerMethodField()

    class Meta:
        model = Pymes
        fields = '__all__'
        
    def get_perfil(self, obj):
        try:
            perfil = PerfilPymes.objects.get(id_pyme=obj)
            return PerfilPymesSerializer(perfil).data
        except PerfilPymes.DoesNotExist:
            return None
        
    def get_imagenes(self, obj):
        imagenes = Imagenes.objects.filter(id_pyme=obj)
        return ImagenesSerializer(imagenes, many=True).data

    def get_redes(self, obj):
        redes = PerfilRedes.objects.filter(id_pyme=obj)
        return RedesSocialesNestedSerializer(redes, many=True).data
    
    def get_publicaciones(self, obj):
        publicaciones = Publicaciones.objects.filter(id_pyme=obj)
        return PublicacionesSerializer(publicaciones, many=True).data