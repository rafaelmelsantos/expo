para rodar essa budega certifique que vc tenha abaixado os seguintes programas

-postgresql
-docker

comandos do dia a dia 

docker compose up -d          Ligar tudo no Docker
docker compose logs -f api    Ver os logs
docker compose down           desliga (os dados ficam no volume)
docker compose up -d --build  # liga de novo depois de mudar o código

docker compose up -d db
npm run start:dev

para testar as rotas

{
  "name": "Teste",
  "email": "teste@email.com",
  "cpf": "12345678900",
  "password": "123456"
}

{
  "email": "teste@email.com",
  "password": "123456"
}

o auth tbm é bom testar

Authorization: Bearer COLE_O_TOKEN_AQUI

confirme no banco

docker compose exec db psql -U app -d app

1.\dt

2.SELECT id, email, name, password FROM "User";

3.SELECT * FROM "Questions";

4.\q