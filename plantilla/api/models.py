from django.db import models



class Autor (models.Model):
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=100, blank=True,null=True)
   
    def __str__(self):
        return self.nombre
    
 