# Ignite - Node JS - Rentx

Project created in a Rocketseat training program.

[Rocketseat official website](https://www.rocketseat.com.br/)

## Car registration API

<p align="center">
  <img alt="table diagram" src=".github/diagram.png" width="100%">
</p>


# Requistos

## Cadastro de carros

**Requisitos funcionais**
- [X] Deve ser possível cadstrar um novo carro.

**Regras de negócio**
- [X] Não deve ser possível um carro com uma placa já existente.
- [X] O carro deve ser cadstrado, por padão, com disponibilidade.
- [X] O usuário responsavel pelo cadastro deve ser um usuário administrador.

## Listagem de carros

**Requisitos funcionais**
- [X] Deve ser possível listar todos os carros disponíveis.
- [X] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [X] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [X] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de negócio**
- [X] O usuário não precisa esta logado no sistema.

## Cadastro de Especificação no carro

**Requisitos funcionais**
- [X] Deve ser possível cadastrar um especificação para um carro.

**Regras de negócio**
- [X] Não deve ser possível cadastrar um especificação para um carro não cadastrado.
- [X] Não deve ser possível cadastrar um especificação já existente para o mesmo carro.
- [X] O usuário responsavel pelo cadastro deve ser um usuário administrador.

## Cadastro de imagens do carro

**Requisitos funcionais**
- [x] Deve ser possível cadstrar a imagem do carro.

**Requisitos não funcionais**
- [x] Utilizar o multer para upload dos arquivos.

**Regras de negócio**
- [x] O usuário de poder cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsavel pelo cadastro deve ser um usuário administrador.

## Aluguel de carro

**Requisitos funcionais**
- [] Deve ser possível cadastrar um aluguel.

**Regras de negócio**
- [] O aluguel deve ter duração mínima de 24 hora.
- [] Não deve sser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [] Não deve sser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- [] O usuário deve estar logado na aplicação.