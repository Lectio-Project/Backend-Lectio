<div align="center">
  <svg width="100" height="200" viewBox="0 0 204 312" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.1804 267.183C20.1804 267.183 27.6421 217.329 103.449 289.172M188.328 260.152C188.328 260.152 164.806 230.047 101.008 290.257M2 224.246C2 224.246 35.3486 201.921 59.1298 224.857M3.89173 190.136C3.89173 190.136 17.1137 178.015 59.1294 219.683M59.1294 219.683C59.1294 219.683 24.7047 162.805 5.65382 181.523M59.1294 219.683C59.1294 219.683 36.8509 153.397 9.0871 173.23M59.1298 222.488C59.1298 222.488 21.8367 190.87 2 209.587M101.999 289.554C101.999 289.554 122.897 186.613 160.35 176.15C160.35 176.15 153.094 196.816 139.3 192.75M138.377 193.988C138.377 193.988 142.855 181.385 137.698 175.859C137.698 175.859 127.802 182.914 136.363 196.503M130.282 206.966C130.282 206.966 142.489 195.624 153.812 195.845C153.812 195.845 147.517 211.047 129.367 208.678M127.635 212.056C127.635 212.056 130.351 196.503 123.286 194.462C123.286 194.462 118.464 201.149 126.002 214.914M124.659 218.3C124.659 218.3 137.408 208.563 144.435 212.079C144.435 212.079 138.423 221.602 124.194 219.324M122.981 222.075C122.981 222.075 123.721 209.465 113.36 210.023C113.36 210.023 112.193 220.234 122.798 222.488M3.46481 226.699H70.2307M102.076 211.964H70.2305L85.8786 109.764M70.2305 219.683H102.076M69.963 226.699H101.801M69.963 234.755H101.801M69.963 242.803H101.801M102.747 288.408L102.305 109M95.4002 109.764L71.5045 210L102.374 136.216M71.5045 211.322L102.374 114.686M70.2305 262.881V115.626M59.1297 226.699V119.86M202 209.595C202 264.92 157.228 309.769 102 309.769C46.7715 309.769 2 264.92 2 209.595C2 154.27 46.7715 109.42 102 109.42C157.228 109.42 202 154.27 202 209.595ZM157.703 144.287C157.703 148.744 154.096 152.358 149.646 152.358C145.197 152.358 141.589 148.744 141.589 144.287C141.589 139.829 145.197 136.216 149.646 136.216C154.096 136.216 157.703 139.829 157.703 144.287ZM10.8574 246.785C12.8945 247.587 14.8934 248.466 17.0831 249.009C36.9808 253.923 57.7712 244.492 69.3834 228.923C68.7883 228.687 65.149 227.991 62.4405 228.167C41.9782 229.451 22.4771 231.224 10.8574 246.785Z" stroke="#FDBB22" stroke-width="3" stroke-miterlimit="10"/>
  </svg>
</div>

<h3 align="center">O Lectio trata-se de API de livros que conecta usuários e autores.</h3>

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