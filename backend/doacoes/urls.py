from django.urls import path
from . import views

urlpatterns = [
    path('cadastro/', views.cadastro_usuario, name='cadastro_usuario'),
    path('doacao/', views.cadastrar_doacao, name='cadastrar_doacao'),
    path('listar_doacoes/', views.listar_doacoes, name='listar_doacoes'),
    path('status/<str:codigo>/', views.status_doacao, name='status_doacao'),
]
