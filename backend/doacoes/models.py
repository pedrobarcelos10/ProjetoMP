import qrcode

from django.db import models
from django.contrib.auth.models import User

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
    def __str__(self):
        return self.nome_item
