from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Doador, Doacao
from django.conf import settings

@api_view(['POST'])
def cadastro_usuario(request):
    if request.method == 'POST':
        nome_completo = request.data['nome_completo']
        email = request.data['email']
        telefone = request.data['telefone']
        endereco = request.data['endereco']
        senha = request.data['senha']

        usuario = User.objects.create_user(username=email, email=email, password=senha)
        Doador.objects.create(usuario=usuario, nome_completo=nome_completo, telefone=telefone, endereco=endereco)

        return Response({"mensagem": "Usuário cadastrado com sucesso!"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cadastrar_doacao(request):
    try:
        doador = Doador.objects.get(usuario=request.user)

        nome_item = request.data.get('nome_item')
        tipo_item = request.data.get('tipo_item')
        peso = request.data.get('peso')
        dimensoes = request.data.get('dimensoes')
        endereco_destino = request.data.get('endereco_destino')

        doacao = Doacao.objects.create(
            doador=doador,
            nome_item=nome_item,
            tipo_item=tipo_item,
            peso=peso,
            dimensoes=dimensoes,
            endereco_destino=endereco_destino
        )

        qr_code_url = f'http://localhost:8000/{settings.MEDIA_URL}{doacao.qr_code}'
        print(qr_code_url)

        return Response({
            "mensagem": "Doação cadastrada com sucesso!",
            "qr_code": qr_code_url
        })

    except Doador.DoesNotExist:
        return Response({"erro": "Doador não encontrado."}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_doacoes(request):
    doador = Doador.objects.get(usuario=request.user)
    doacoes = Doacao.objects.filter(doador=doador).values('id', 'nome_item', 'tipo_item', 'qr_code')
    return Response(doacoes)

@api_view(['GET'])
def status_doacao(request, codigo):
    try:
        doacao = Doacao.objects.get(pk=codigo)
        qr_code_url = f'http://localhost:8000/{settings.MEDIA_URL}{doacao.qr_code}'
        return Response({
            'status': 'Em trânsito',
            'localizacao': doacao.endereco_destino,
            'latitude': doacao.latitude,
            'longitude': doacao.longitude,
            'qr_code': qr_code_url
        })
    except Doacao.DoesNotExist:
        return Response({'erro': 'Doação não encontrada.'}, status=404)






