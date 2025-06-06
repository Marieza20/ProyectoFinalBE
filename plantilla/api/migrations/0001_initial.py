# Generated by Django 5.2.1 on 2025-06-05 15:34

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Categorias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Imagenes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen1', models.ImageField(upload_to='imagenes/')),
                ('imagen2', models.ImageField(blank=True, null=True, upload_to='imagenes/')),
                ('imagen3', models.ImageField(blank=True, null=True, upload_to='imagenes/')),
            ],
        ),
        migrations.CreateModel(
            name='Publicaciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to='publicaciones/')),
                ('descripcion', models.TextField()),
                ('fecha_Publicacion', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pymes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('nombre', models.CharField(max_length=100)),
                ('telefono', models.CharField(max_length=20)),
                ('correo', models.EmailField(max_length=254, unique=True)),
                ('contrasena', models.CharField(max_length=100)),
                ('carnet', models.ImageField(blank=True, null=True, upload_to='pymes/')),
            ],
        ),
        migrations.CreateModel(
            name='RedesSociales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Publi_Categorias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.categorias')),
                ('id_publicacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.publicaciones')),
            ],
        ),
        migrations.CreateModel(
            name='Calificaciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Cantidad', models.IntegerField()),
                ('id_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('id_publicacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.publicaciones')),
            ],
        ),
        migrations.AddField(
            model_name='publicaciones',
            name='id_pyme',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pymes'),
        ),
        migrations.CreateModel(
            name='PerfilRedes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=100)),
                ('id_pyme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pymes')),
                ('id_redes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.redessociales')),
            ],
        ),
        migrations.CreateModel(
            name='PerfilPymes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.TextField()),
                ('especialidad', models.CharField(max_length=100)),
                ('ubicacion', models.CharField(max_length=100)),
                ('fotoPerfil', models.ImageField(blank=True, null=True, upload_to='perfil_pymes/')),
                ('fotoPortada', models.ImageField(blank=True, null=True, upload_to='perfil_pymes/portada/')),
                ('id_imagenes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.imagenes')),
                ('id_perfilRed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.perfilredes')),
                ('id_pyme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pymes')),
            ],
        ),
        migrations.AddField(
            model_name='imagenes',
            name='id_pyme',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pymes'),
        ),
        migrations.CreateModel(
            name='Reacciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_publicacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.publicaciones')),
                ('id_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Seguidores',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_pyme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pymes')),
                ('id_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
