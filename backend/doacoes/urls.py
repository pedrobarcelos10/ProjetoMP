from django.urls import path
from . import views

urlpatterns = [
    path('cadastro/', views.cadastro_usuario, name='cadastro_usuario'),
    path('doacao/', views.cadastrar_doacao, name='cadastrar_doacao'),
    path('minhas-doacoes/', views.minhas_doacoes, name='minhas_doacoes'),
    path('status/<str:codigo>/', views.status_doacao, name='status_doacao'),
]
