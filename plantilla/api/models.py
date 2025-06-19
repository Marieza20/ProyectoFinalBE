from django.db import models
from django.contrib.auth.models import User
    
class Pymes(models.Model):
    username = models.CharField(max_length=100, unique=True)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    carnet = models.ImageField(upload_to='pymes/', blank=True, null=True)
    verificada = models.BooleanField(default=False)  

    def __str__(self):
        return self.nombre




class Categorias(models.Model):
    nombre = models.CharField(max_length=100)
    

    def __str__(self):
        return self.nombre




class RedesSociales(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
    
    
    
class Seguidores(models.Model):
    id_pyme = models.ForeignKey(Pymes, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)




class PerfilRedes (models.Model):
    id_pyme = models.ForeignKey(Pymes, on_delete=models.CASCADE)
    id_redes = models.ForeignKey(RedesSociales, on_delete=models.CASCADE)
    url = models.CharField(max_length=100)

    def __str__(self):
        return self.url




class Imagenes(models.Model):
    id_pyme = models.ForeignKey(Pymes, on_delete=models.CASCADE)
    imagen1 = models.ImageField(upload_to='imagenes/')
    imagen2 = models.ImageField(upload_to='imagenes/')
    imagen3 = models.ImageField(upload_to='imagenes/')

    def __str__(self):
        return self.imagen.name




class PerfilPymes (models.Model):
    id_pyme = models.ForeignKey(Pymes, on_delete=models.CASCADE)
    descripcion = models.TextField()
    especialidad = models.CharField(max_length=100 )
    ubicacion = models.CharField(max_length=100)
    fotoPerfil = models.ImageField(upload_to='perfil_pymes/', blank=True, null=True)
    fotoPortada = models.ImageField(upload_to='perfil_pymes/portada/', blank=True, null=True)

    def __str__(self):
        return self.descripcion




class Publicaciones(models.Model):
    id_pyme = models.ForeignKey(Pymes, on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='publicaciones/')
    descripcion = models.TextField()
    fecha_Publicacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.descripcion




class Publi_Categorias(models.Model):
    id_publicacion = models.ForeignKey(Publicaciones, on_delete=models.CASCADE)
    id_categoria = models.ForeignKey(Categorias, on_delete=models.CASCADE)

    def __str__(self):
        return self.id_categoria




class Reacciones(models.Model):
    id_publicacion = models.ForeignKey(Publicaciones, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.id_publicacion




class Calificaciones(models.Model):
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    id_publicacion = models.ForeignKey(Publicaciones, on_delete=models.CASCADE)
    Cantidad = models.IntegerField()
    
    def __str__(self):
        return self.Cantidad
