# Lectio
O Lectio trata-se de API de livros que conecta usuários e autores.

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

  - Crie e/ou preencha no arquivo **.env** a variável de ambiente **DATABASE_URL** com o link para o seu banco de dados MongoDB

  - No arquivo **.env** crie e/ou preencha o **JWT_SECRET_KEY** com a sua chave JWT secreta

  -  No arquivo **.env** crie e/ou preencha o **BUCKET_URL** com a URL do seu bucket

  - No arquivo **.env** crie e/ou preencha o **BUCKET_APP_KEY** com a chave secreta do seu bucket
  
  - No arquivo **.env** crie e/ou preencha o **BUCKET_KEY_ID** com o ID do seu bucket

  -  No arquivo **.env** crie e/ou preencha o **BUCKET_NAME** com o nome do seu bucket

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
### Usuários 
```ts
@Controller('users')
```

- Listar todos os usuários:
```ts
@Get();
```

- Listar um único usuário:
```ts
@Get(':id');
```

- Cadastro de usuário:
```ts
@Post('sign-up');
```

- Login de usuário:
```ts
@Post('sign-in');
```

- Atualização de usuário:
```ts
@Patch();
```

- Remoção de usuário:
```ts
@Delete()
```

### Gêneros 
```ts
@Controller('genres')
```

- Listar todos os gêneros:
```ts
@Get();
```

- Listar um único gênero:
```ts
@Get(':id');
```

- Cadastro de gênero:
```ts
@Post();
```

- Atualização de gênero:
```ts
@Patch(':id');
```

- Remoção de gênero:
```ts
@Delete(':id')
```

### Autores 
```ts
@Controller('authors')
```

- Listar todos os autores:
```ts
@Get();
```

- Listar um único autor:
```ts
@Get(':id');
```

- Cadastro de autor:
```ts
@Post();
```

- Atualização de autor:
```ts
@Patch(':id');
```

- Remoção de autor:
```ts
@Delete(':id')
```

### Comentários 
```ts
@Controller('comments')
```

- Listar todos os comentários:
```ts
@Get();
```

- Listar um único comentário:
```ts
@Get(':id');
```

- Cadastro de comentário:
```ts
@Post();
```

- Atualização de comentário:
```ts
@Patch(':id');
```

- Remoção de comentário:
```ts
@Delete(':id')
```

### Pensamentos 
```ts
@Controller('thought')
```

- Listar todos os pensamentos:
```ts
@Get();
```

- Listar um único pensamento:
```ts
@Get(':id');
```

- Cadastro de pensamento:
```ts
@Post();
```

- Atualização de pensamento:
```ts
@Patch(':id');
```

- Remoção de pensamento:
```ts
@Delete(':id')
```

### Livros 
```ts
@Controller('books')
```

- Listar todos os livros:
```ts
@Get();
```

- Listar um único livro:
```ts
@Get(':id');
```

- Cadastro de livro:
```ts
@Post();
```

- Atualização de livro:
```ts
@Patch(':id');
```

- Remoção de livro:
```ts
@Delete(':id')
```

## 🆕 Funcionalidades
### Usuários
1. Cadastrar usuário
2. Login de usuário
3. Atualização de usuário
4. Autenticação e Autorização
5. Listagem de todos os usuários
6. Listar um único usuário
7. Remoção de usuário

### Gêneros
1. Cadastrar gênero
2. Listagem de todos os gêneros
3. Listagem de um único gênero
4. Atualização de gênero
5. Remoção de gênero

### Livros
1. Cadastrar livro
2. Listagem de todos os livros
3. Listagem de um único livro
4. Atualização de livro
5. Remoção de livro

### Autores
1. Cadastrar autor
2. Listagem de todos os autores
3. Listagem de um único autor
4. Atualização de autor
5. Remoção de autor

### Pensamentos
1. Cadastrar pensamento
2. Listagem de todos os pensamentos
3. Listagem de um único pensamento
4. Atualização de pensamento
5. Remoção de pensamento

### Comentários
1. Cadastrar comentário
2. Listagem de todos os comentários
3. Listagem de um único comentário
4. Atualização de comentário
5. Remoção de comentário

## 🔧 Tecnologias
- Nest
- Express
- TypeScript
- Prisma
- MongoDB
- Swagger
  
## 🚀 Deploy
- Link da API em produção:
```text
https://backend-lectio-r3do.onrender.com/
```

&copy; MIT License 2024, feito com 🖤 por [Alisson Romão](https://github.com/alissonromaosantos), [Vanessa Ribeiro](https://github.com/vanessaribeiro03) e [Erick Staviasz](https://github.com/staviasz).