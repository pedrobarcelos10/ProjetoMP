from django.db import models

# Create your models here.

class Pessoa(models.Model):
    nome = models.CharField(max_length=250)
    email = models.EmailField(unique=True)
    endereco = models.CharField(max_length=250)
    telefone = models.CharField(max_length=20)
    
    class Meta:
        abstract = True
    
    def __str__(self):
        return self.name

class Doador(Pessoa):
    tipo_doacao = models.CharField(max_length=100, default = 'diversos')

    def __str__(self):
        return f'Doador: {self.name}'


class Recebedor(Pessoa):
    necessidade = models.CharField(max_length=250, default = 'diversos')
    
    def __str__(self):
        return f'Recebedor: {self.name}'


class Item(models.Model):
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    tamanho = models.DecimalField(max_digits=5, decimal_places=2)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
        
    # Relacionamento um para muitos entre um doador e muitos itens a serem doados    
    doador = models.ForeignKey(Doador, related_name='itens', on_delete=models.CASCADE)


    # Relacionamento um para um entre um recebedor e um item
    recebedor = models.ForeignKey(Recebedor, related_name='itens_recebidos', on_delete=models.SET_NULL, null=True, blank=True)
    
    def save(self, *args, **kwargs):
        # verifica se o doador assosciado ao item existe no banco de dados
        if not self.doador_id:
            raise ValidationError("O item precisa de um doador válido.")
        
        # verifica se o doador realemnte existe no banco de dados
        if not Doador.objects.filter(id=self.doador_id).exists():
            raise ValidationError("Doador não encontrado.")
        
        # chama o save da classe model
        super().save(*args, **kwargs)

