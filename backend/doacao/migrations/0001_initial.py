# Generated by Django 3.2.25 on 2024-09-09 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=250)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('endereco', models.CharField(max_length=250)),
                ('telefone', models.CharField(max_length=20)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Recebedor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=250)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('endereco', models.CharField(max_length=250)),
                ('telefone', models.CharField(max_length=20)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
