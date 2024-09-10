from django.urls import path
from . import views


urlpatterns = [
    path('doador/', views.createDoadorView.as_view(), name='createDoadorView'),
    path('doador/list/', views.listDoadorView.as_view(), name='listDoadorView'),
    path('doador/id/<int:id>/', views.BuscarDoadorPorIdView.as_view(), name='BuscarDoadorPorIdView'),
    path('doador/nome/<str:nome>/', views.BuscarDoadorPorNomeView.as_view(), name='BuscarDoadorPorNomeView'),
    path('doador/remover/id/<int:id>/', views.RemoverDoadorPorId.as_view(), name='RemoverDoadorPorId'),



    path('recebedor/', views.createRecebedorView.as_view(), name='createRecebedorView'),
    path('recebedor/list/', views.listRecebedorView.as_view(), name='listRecebedorView'),
    path('recebedor/id/<int:id>/', views.BuscarRecebedorPorIdView.as_view(), name='BuscarRecebedorPorIdView'),
    path('recebedor/nome/<str:nome>/', views.BuscarRecebedorPorNomeView.as_view(), name='BuscarRecebedorPorNomeView'),
    path('recebedor/remover/id/<int:id>/', views.RemoverRecebedorPorId.as_view(), name='RemoverRecebedorPorId'),


    path('item/novo/', views.CriarItemView.as_view(), name='CriarItemView'),
    path('item/list/', views.ListItemView.as_view(), name='ListItemView'),

    path('item/selecionar/<int:pk>/', views.SelecionarItemView.as_view(), name='SelecionarItemView'),

]




