import qrcode
from io import BytesIO
from django.core.files import File
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import User
import random

class Doador(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=255)
    telefone = models.CharField(max_length=20)
    endereco = models.TextField()

    def __str__(self):
        return self.nome_completo

class Doacao(models.Model):
    doador = models.ForeignKey(Doador, on_delete=models.CASCADE)
    nome_item = models.CharField(max_length=255)
    tipo_item = models.CharField(max_length=255)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    dimensoes = models.CharField(max_length=255)
    endereco_destino = models.TextField()
    data_doacao = models.DateTimeField(auto_now_add=True)
    qr_code = models.ImageField(upload_to='qrcodes/', blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    def __str__(self):
        return self.nome_item

def gerar_coordenadas_aleatorias_rs():
    latitude = random.uniform(-33.75, -29.00)
    longitude = random.uniform(-57.65, -49.75)
    return latitude, longitude

@receiver(post_save, sender=Doacao)
def gerar_qrcode(sender, instance, created, **kwargs):
    if created:
        if not instance.latitude or not instance.longitude:
            instance.latitude, instance.longitude = gerar_coordenadas_aleatorias_rs()
        qr_content = f'http://maps.google.com/maps?q={instance.latitude},{instance.longitude}'
        qrcode_img = qrcode.make(qr_content)
        buffer = BytesIO()
        qrcode_img.save(buffer, format='PNG')
        file_name = f'qr_{instance.id}.png'
        instance.qr_code.save(file_name, File(buffer), save=False)
        instance.save()
