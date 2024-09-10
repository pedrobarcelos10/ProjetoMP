from rest_framework import serializers
from . models import Doador, Recebedor, Item


class DoadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doador
        fields = ['id', 'nome', 'email', 'endereco', 'tipo_doacao']


class RecebedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recebedor
        fields = ['id', 'nome', 'email', 'endereco', 'necessidade']
        

class ItemSerializer(serializers.ModelSerializer):
    doador_id = serializers.IntegerField(write_only=True)
    doador = DoadorSerializer(read_only=True)
    
    recebedor_id = serializers.IntegerField(required=False, allow_null=True, write_only=True)
    recebedor = RecebedorSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ['id', 'nome', 'tipo', 'tamanho', 'peso', 'doador_id', 'doador', 'recebedor', 'recebedor_id']

    def validate_doador_id(self, value):
        # Verifica se o doador com o ID fornecido existe
        if not Doador.objects.filter(id=value).exists():
            raise serializers.ValidationError("Doador não encontrado.")
        return value

    def validate_recebedor_id(self, value):
        # verifica se o recebedor com o ID fornecido existe e se for fornecido
        if value is not None and not Recebedor.objects.filter(id=value).exists():
            raise serializers.ValidationError("Recebedor não encontrado.")

        return value

    def create(self, validated_data):
        doador_id = validated_data.pop('doador_id')
        recebedor_id = validated_data.pop('recebedor_id', None) # pode ser None se não fornecido

        doador = Doador.objects.get(id=doador_id)
        recebedor = Recebedor.objects.get(id=recebedor_id) if recebedor_id else None

        item = Item.objects.create(doador=doador, recebedor=recebedor, **validated_data)
        return item
    
    
