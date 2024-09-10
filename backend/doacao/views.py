from . models import Doador, Recebedor, Item
from rest_framework import status, generics
from rest_framework.response import Response
from . serializers import DoadorSerializer, RecebedorSerializer, ItemSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView



class createDoadorView(generics.CreateAPIView):
    queryset = Doador.objects.all()
    serializer_class = DoadorSerializer
    

class listDoadorView(generics.ListAPIView):
    queryset = Doador.objects.all()
    serializer_class = DoadorSerializer


class BuscarDoadorPorIdView(generics.RetrieveAPIView):
    serializer_class = DoadorSerializer
    queryset = Doador.objects.all()  # Define o conjunto padrão

    def get_object(self):
        id = self.kwargs['id']
        return get_object_or_404(Doador, id=id)  # Busca pelo id


class BuscarDoadorPorNomeView(generics.ListAPIView):
    serializer_class = DoadorSerializer
    def get_queryset(self):
        nome = self.kwargs['nome']
        return Doador.objects.filter(nome__icontains=nome)
    

class RemoverDoadorPorId(generics.DestroyAPIView):
    queryset = Doador.objects.all()
    serializer_class = DoadorSerializer
    
    def get_object(self):
        id = self.kwargs['id']
        return get_object_or_404(Doador, id=id)




class createRecebedorView(generics.CreateAPIView):
    queryset = Recebedor.objects.all()
    serializer_class = RecebedorSerializer
    

class listRecebedorView(generics.ListAPIView):
    queryset = Recebedor.objects.all()
    serializer_class = RecebedorSerializer


class BuscarRecebedorPorIdView(generics.RetrieveAPIView):
    serializer_class = RecebedorSerializer
    queryset = Recebedor.objects.all()  # Define o conjunto padrão

    def get_object(self):
        id = self.kwargs['id']
        return get_object_or_404(Recebedor, id=id)  # Busca pelo id


class BuscarRecebedorPorNomeView(generics.ListAPIView):
    serializer_class = RecebedorSerializer
    def get_queryset(self):
        nome = self.kwargs['nome']
        return Recebedor.objects.filter(nome__icontains=nome)
    

class RemoverRecebedorPorId(generics.DestroyAPIView):
    queryset = Recebedor.objects.all()
    serializer_class = RecebedorSerializer
    
    def get_object(self):
        id = self.kwargs['id']
        return get_object_or_404(Recebedor, id=id)






class CriarItemView(APIView):
    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        
        # Validação dos dados recebidos
        if serializer.is_valid():
            # Criação do item
            item = serializer.save()
            return Response({
                'message': 'Item criado com sucesso!',
                'item': ItemSerializer(item).data
            }, status=status.HTTP_201_CREATED)
        
        # Se os dados forem inválidos, retorna erro
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListItemView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class SelecionarItemView(generics.UpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    
    def patch(self, request, *args, **kwargs):
        item = self.get_object()
        recebedor_id = request.data.get('recebedor_id')
        
        print(f'ID do recebedor: {recebedor_id}')

        # verifica se o recebedor existe
        try:
            recebedor = Recebedor.objects.get(id=recebedor_id)
        except Recebedor.DoesNotExist:
            return Response({"error":"Recebedor não encontrado"}, status=status.HTTP_400_NOT_FOUND)
    
        # Verifica se o item já está associado a outro recebedor
        if item.recebedor_id is not None:
            return Response({"error": "Item já está associado a um recebedor"}, status=atatus.HTTP_400_BAD_REQUEST)
    
        # Atualiza o item com o recebedor
        item.recebedor = recebedor
        item.save()
        
        return Response({
            'message': 'Item associado com sucesso!',
            'item': ItemSerializer(item).data
        }, status=status.HTTP_200_OK)




