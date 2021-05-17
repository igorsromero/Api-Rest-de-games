# API Rest de Games
 Desenvolvendo uma API Rest de Games, como forma de estudo, utilizando também Node.js.
 O banco de dados utilizado, é um banco de dados fictício, apenas para simular os dados de um banco real.
 Informações sobre como foram realizados os testes no programa POSTMAN, estão localizados no arquivo postman.txt.

## Initializing:
```
npm init
```

## Module: Express
```
npm install express --save
```

## Module: Body-Parser
```
npm install body-parser --save
```

## Module: CORS
```
npm install cors --save
```

## Module: JsonWebToken
```
npm install jsonwebtoken --save
```

## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum.
#### Respostas
##### OK ! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games.
Exemplo de resposta:
```
[
    {
        "id": 1,
        "title": "Sea of Thieves",
        "year": 2020,
        "price": 60
    },
    {
        "id": 2,
        "title": "Bloons TD6",
        "year": 2021,
        "price": 4
    },
    {
        "id": 3,
        "title": "Phasmofobia",
        "year": 2020,
        "price": 30
    }
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisitação. Motivos: Token inválido, token inválido.
Exemplo de respota:
```
{
    "err": "Token inválido!"
}
```


### POST /auth
Esse endpoint é responsável por autenticar o processo de login.
#### Parametros
e-mail: E-mail do usuário cadastrado no sistema.
password: Senha do ussuário cadastrado no sistema.
Exemplo:
```
{
    "email": "igorsolfaromero@gmail.com",
    "password": "igor"
}
```
#### Respostas
##### OK ! 200
Caso essa resposta aconteça, você vai receber o token JWT para conseguir acessar os endpoints protegidos na API.
Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpZ29yc29sZmFyb21lcm9AZ21haWwuY29tIiwiaWF0IjoxNjIxMjg3MTQ5LCJleHAiOjE2MjE0NTk5NDl9._8LwTMMuBnjciqFJZrykJ4tHNwhJKb71ARPzms4mWR4"
}
```
##### Falha na autenticação! 400
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisitação. Motivos: E-mail incorreto.
Exemplo de respota:
```
{
    err: "E-mail inválido,"
}
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisitação. Motivos: Senha ou e-mail incorreto.
Exemplo de respota:
```
{
    err: "Credenciais inválidas."
}
```

##### Falha na autenticação! 404
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisitação. Motivos: E-mail incorreto.
Exemplo de respota:
```
{
    err: "E-mail inválido."
}
```