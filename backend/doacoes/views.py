from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Doador, Doacao

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
@permission_classes([IsAuthenticated])  # Garante que somente usuários autenticados possam acessar essa view
def cadastrar_doacao(request):
    try:
        # Acesso ao usuário autenticado
        doador = Doador.objects.get(usuario=request.user)

        # Pegar os dados da requisição
        nome_item = request.data.get('nome_item')
        tipo_item = request.data.get('tipo_item')
        peso = request.data.get('peso')
        dimensoes = request.data.get('dimensoes')
        endereco_destino = request.data.get('endereco_destino')

        # Criar a doação
        doacao = Doacao.objects.create(
            doador=doador,
            nome_item=nome_item,
            tipo_item=tipo_item,
            peso=peso,
            dimensoes=dimensoes,
            endereco_destino=endereco_destino,
        )

        return Response({"mensagem": "Doação cadastrada com sucesso!"})

    except Doador.DoesNotExist:
        return Response({"erro": "Doador não encontrado."}, status=404)
    except Exception as e:
        return Response({"erro": str(e)}, status=400)

@api_view(['GET'])
def minhas_doacoes(request):
    doador = Doador.objects.get(usuario=request.user)
    doacoes = Doacao.objects.filter(doador=doador).values()  # Retorna os dados das doações
    return Response(doacoes)

@api_view(['GET'])
def status_doacao(request, codigo):
    try:
        doacao = Doacao.objects.get(pk=codigo)
        return Response({'status': 'Em trânsito'})  # Exemplo de status, você pode ajustar conforme a lógica da aplicação
    except Doacao.DoesNotExist:
        return Response({'erro': 'Doação não encontrada.'}, status=404)

