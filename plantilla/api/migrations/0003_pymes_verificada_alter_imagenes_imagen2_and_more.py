# Generated by Django 5.2.1 on 2025-06-19 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_perfilpymes_id_imagenes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagenes',
            name='imagen2',
            field=models.ImageField(default='', upload_to='imagenes/'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='imagenes',
            name='imagen3',
            field=models.ImageField(default='', upload_to='imagenes/'),
            preserve_default=False,
        ),
    ]
