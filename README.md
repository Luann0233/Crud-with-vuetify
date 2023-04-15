# crud-with-vuetify
## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

# Instruções
Faça em Vue.js uma tela de gestão de usuários (CRUD) utilizando uma api pública de usuários. Para facilitar o desenvolvimento, recomendamos o uso de um UI framework baseado em Vue.js como Vuetify ou Quasar. 

 - Faça login nessa plataforma https://gorest.co.in/consumer/login e pegue o "API Access Token" Coloque no header {Authorization: Bearer {token}} de todos os requests.

Recursos da API para utilizar no crud para desenvolver a tela.

 - **GET** - https://gorest.co.in/public/v1/users - Retorna todos os usuários

 - **POST** - https://gorest.co.in/public/v1/users - Cria um novo usuário

 - **GET** - https://gorest.co.in/public/v1/users/123 - Retorna os detalhes de um unico usuário

 - **PUT** | PATCH - https://gorest.co.in/public/v1/users/123 - Altera os dados de um usuário

 - **DELETE** - https://gorest.co.in/public/v1/users/123 - Exclui um usuário

Para paginar na api basta passar a chave e valor da página na query 

 - **GET** - https://gorest.co.in/public/v1/users?page=2 

Para filtrar na api basta passar a chave e valor do model na query

 - **GET** - https://gorest.co.in/public/v1/users?name=teste 


Estrutura da entidade usuário:
```json
{ 
"id": number, 
"name": string, 
"email": string, 
"gender": string(male, female), 
"status": string(active, inactive) 
} 
```

Colocar validação na criação e edição do usuário:
```json
{ 
"name": requerido, máximo de 191 caracteres, 
"email": requerido, email, máximo de 191 caracteres,
"gender": requerido, deve ser uma opção válida,
"status": requerido, deve ser uma opção válida
} 
```

 - [x] Colocar uma forma fácil de ativar ou desativar um usuário. 
 - [x] Colocar paginação server side. 
 - [x] Colocar filtro server side (filtrar por name, email, gender e status). 
 - [x] Tratar exceções para notificar o usuário em caso de erro. 


