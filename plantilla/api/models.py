from django.db import models


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre}"
    
class Pymes(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    carnet = models.CharField(max_length=20)

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
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    
class PerfilPymes (models.Model):
    id_pyme = models.ForeignKey(Pymes, on_delete=models.CASCADE)
    id_redes = models.ForeignKey(RedesSociales, on_delete=models.CASCADE)
    descripcion = models.TextField()
    ubicacion = models.CharField(max_length=100)

    def __str__(self):
        return self.descripcion
    
class PerfilRedes (models.Model):
    id_pyme = models.ForeignKey(Pymes, on_delete=models.CASCADE)
    id_redes = models.ForeignKey(RedesSociales, on_delete=models.CASCADE)
    url = models.CharField(max_length=100)

    def __str__(self):
        return self.url
    
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
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.id_publicacion
    
class Calificaciones(models.Model):
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_publicacion = models.ForeignKey(Publicaciones, on_delete=models.CASCADE)
    Cantidad = models.IntegerField()
    
    def __str__(self):
        return self.Cantidad


