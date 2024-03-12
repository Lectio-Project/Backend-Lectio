# Lectio API
API de livros que conecta usuários e autores.

## ⚙️ Instalação e Configuração 
#### Siga os seguintes passos:
1. Abra o terminal e clone este repositório para sua máquina com o seguinte comando:
```bash
git clone https://github.com/Lectio-Project/Backend-Lectio.git
```

2. Navegue até a pasta do projeto com o comando:
```bash
cd Backend-Lectio
```

3. Abra o projeto no seu VSCode (Se não tiver instalado, instale-o [aqui!](https://code.visualstudio.com/download)):
```bash
code .
```
4. Renomei o arquivo **.env.example** para **.env** ou crie um arquivo **.env** na raiz do projeto
   
    4.1 Crie e/ou preencha no arquivo **.env** a variável de ambiente **DATABASE_URL** com o link para o seu banco de dados MongoDB
   
    4.2 No arquivo **.env** crie e/ou preencha o **JWT_SECRET_KEY** com a sua chave JWT secreta

    4.3 No arquivo **.env** crie e/ou preencha o **BUCKET_URL** com a URL do seu bucket
   
    4.4 No arquivo **.env** crie e/ou preencha o **BUCKET_APP_KEY** com a chave secreta do seu bucket
   
    4.5 No arquivo **.env** crie e/ou preencha o **BUCKET_KEY_ID** com o ID do seu bucket
   
    4.6 No arquivo **.env** crie e/ou preencha o **BUCKET_NAME** com o nome do seu bucket

5. Verifique se você possui o Node.js instalado em sua máquina, caso não instale-o,  [Baixe o Node.js aqui!](https://nodejs.org)

6. Instale as dependências do projeto com o comando:
```bash
npm install
```

7. Rode o seguinte comando para inicializar o servidor em desenvolvimento:
```bash
npm run start:dev
```

8. Para traduzir seu schema do Prisma ORM em código TypeScript que você pode usar em seu aplicativo para interagir com o banco de dados de forma segura e tipada rode o comando abaixo:
```bash
npx prisma generate
```

9. Para aplicar todas as alterações necessárias para garantir que o esquema do banco de dados corresponda ao seu esquema definido no arquivo rode o seguinte comando:
```bash
npx prisma db push
```

## 📡 Rotas
### 👥 Usuários 
| Método | Rota | Subrota | Parâmetro | Headers | Campos |
|:--------|:------|:---------|:-----------|:---------|:--------|
POST | users | sign-up | Nenhum | Nenhum | name, email, password, confirmPassword |
POST | users | sign-in | Nenhum | Nenhum | email, password |
GET | users | Nenhuma | Nenhum | JsonWebToken | Nenhum |
GET | users | Nenhuma | id | JsonWebToken | Nenhum |
PATCH | users | Nenhuma | Nenhum | JsonWebToken | name, email, password, confirmPassword, username, bio, imageUrl |
DELETE | users | Nenhuma | Nenhum | JsonWebToken | Nenhum |

### ℹ️ Gêneros
| Método | Rota | Subrota | Parâmetro | Headers | Campos |
|:--------|:------|---------|:-----------|:---------|:--------|
GET | genres | Nenhuma | Nenhum | JsonWebToken | Nenhum |
GET | genres | Nenhuma | id | JsonWebToken | Nenhum |
POST | genres | Nenhuma | Nenhum | JsonWebToken | gender |
PATCH | genres | Nenhuma | id | JsonWebToken | gender |
DELETE | genres | Nenhuma | id | JsonWebToken | Nenhum |

### ✍🏼 Autores 
| Método | Rota | Subrota | Parâmetro | Headers | Campos |
|:--------|:------|:---------|:-----------|:---------|:--------|
GET | authors | Nenhuma | Nenhum | JsonWebToken | Nenhum |
GET | authors | Nenhuma | id | JsonWebToken | Nenhum |
POST | authors | Nenhuma | Nenhum | JsonWebToken | imageUrl, name, carrerDescription, birthplace, genresId |
PATCH | authors | Nenhuma | id | JsonWebToken | imageUrl, name, carrerDescription, birthplace, genresId |
DELETE | authors | Nenhuma | id | JsonWebToken | Nenhum |

### ⋯ Comentários 
| Método | Rota | Subrota | Parâmetro | Headers | Campos |
|:--------|:------|:---------|:-----------|:---------|:--------|
GET | comments | Nenhuma | Nenhum | JsonWebToken | Nenhum |
GET | comments | Nenhuma | id | JsonWebToken | Nenhum |
POST | comments | Nenhuma | Nenhum | JsonWebToken | text, bookGrade, bookId |
PATCH | comments | Nenhuma | id | JsonWebToken | text, bookGrade, bookId |
DELETE | comments | Nenhuma | id | JsonWebToken | Nenhum |

### 💭 Pensamentos 
| Método | Rota | Subrota | Parâmetro | Headers | Campos |
|:--------|:------|:---------|:-----------|:---------|:--------|
GET | thought | Nenhuma | Nenhum | JsonWebToken | Nenhum |
GET | thought | Nenhuma | id | JsonWebToken | Nenhum |
POST | thought | Nenhuma | Nenhum | JsonWebToken | phrase, bookId |
PATCH | thought | Nenhuma | id | JsonWebToken | phrase, bookId |
DELETE | thought | Nenhuma | id | JsonWebToken | Nenhum |

### 📚 Livros 
| Método | Rota | Subrota | Parâmetro | Headers | Campos |
|:--------|:------|:---------|:-----------|:---------|:--------|
GET | books | Nenhuma | Nenhum | JsonWebToken | Nenhum |
GET | books | Nenhuma | id | JsonWebToken | Nenhum |
POST | books | Nenhuma | Nenhum | JsonWebToken | name, synopsis, publishingCompany, publishYear, genderId, authorId |
PATCH | books | Nenhuma | id | JsonWebToken | name, synopsis, publishingCompany, publishYear, genderId, authorId |
DELETE | books | Nenhuma | id | JsonWebToken | Nenhum |

## 🆕 Funcionalidades

### 👥 Usuários
| Rota | Funcionalidade |
|:------|:--------------|
| users | cadastro de usuário |
| users | Login de usuário |
| users | Listar todos os usuários |
| users | Listar usuário |
| users | Atualização de usuário |
| users | Exclusão de usuário |

### ℹ️ Gêneros
Rota | Funcionalidade |
|:------|:------------|
| genres | Cadastro de gênero |
| genres | Listar todos os gêneros |
| genres | Listar gênero |
| genres | Atualização de gênero |
| genres | Exclusão de gênero |

### 📚 Livros
Rota | Funcionalidade |
|:------|:------------|
| books | Cadastro de livro |
| books | Listar todos os livros |
| books | Listar livro |
| books | Atualização de livro |
| books | Exclusão de livro |

### ✍🏼 Autores
Rota | Funcionalidade |
|:------|:------------|
| authors | Cadastro de autor |
| authors | Listar todos os autores |
| authors | Listar autor |
| authors | Atualização de autor |
| authors | Exclusão de autor |

### 💭 Pensamentos
Rota | Funcionalidade |
|:------|:------------|
| thought | Cadastro de gênero |
| thought | Listar todos os gêneros |
| authors | Listar gênero |
| thought | Atualização de gênero |
| thought | Exclusão de gênero |

### 󠁻󠁻󠁻󠁻󠁻󠁻󠁻⋯ Comentários
Rota | Funcionalidade |
|:------|:------------|
| comments | Cadastro de comentário |
| comments | Listar todos os comentários  |
| comments | Listar comentário |
| comments | Atualização de comentário |
| comments | Exclusão de comentário |

## 🔧 Tecnologias
<p align="left">
  <a href="https://www.typescriptlang.org/" target="_blank" title="TypeScript" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
  <a href="https://expressjs.com/" target="_blank" title="Express" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored-dark.svg" width="36" height="36" alt="Express" /></a>
  <a href="https://docs.nestjs.com/" title="Nest" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nestjs-colored.svg" width="36" height="36" alt="NestJS" /></a>
  <a href="https://www.prisma.io/" title="Prisma" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="36" height="36" alt="Prisma" /></a>
  <a href="https://www.mongodb.com/" title="MongoDB" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg" width="36" height="36" alt="MongoDB" /></a>
<a href="https://swagger.io/" title="Swagger" target="_blank" rel="noreferrer"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" width="36" height="36" alt="Swagger" /></a>     
</p>          
  
## 🚀 Deploy
- Link da API em produção:
```text
https://backend-lectio-r3do.onrender.com/
```
----
<p align="center">&copy; MIT License 2024, feito com 🖤 por <a href="https://github.com/alissonromaosantos" target="_blank">Alisson Romão</a>, <a href="https://github.com/vanessaribeiro03" target="_blank">Vanessa Ribeiro</a> e <a href="https://github.com/staviasz">Erick Staviasz</a>.</p>
