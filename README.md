# GeoHub 🌍

GeoHub é uma aplicação web que permite gerenciar dados sobre cidades, países e continentes, realizando operações CRUD (Create, Read, Update, Delete). Além disso, o sistema integra informações de APIs externas para enriquecer a interface e fornecer dados complementares sobre os países e continentes.

## 📝 Requisitos do Sistema

- **Node.js** (versão 22.x ou superior)
- **MySQL** (versão 6.x ou superior)

## 🚀 Tecnologias Utilizadas

### Backend 🖥️
- **TypeScript**
- **Prisma ORM**
- **MySQL**
- **Node.js + Express**

### Frontend 💻
- **Vite**
- **React + TypeScript**
- **Axios**

### APIs Externas 🌐
- **REST Countries API**: Fornece informações sobre nome, continente, idioma, população, moeda e bandeira.
- **World Bank API**: Fornece dados sobre PIB per Capita e Inflação Anual (2024).

## 🏁 Passos para Rodar o Projeto

### Clonando o Repositório
Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/matheuspires7/GeoHub.git
cd GeoHub
```

### Configuração do Backend 🔧

1. Navegue até a pasta do backend:
  ```bash
  cd backend
  ```

2. Crie e configure o arquivo `.env` com suas credenciais de banco de dados e outras variáveis necessárias.

No arquivo `.env`, você deve configurar as variáveis de ambiente para que a aplicação consiga se conectar ao banco de dados MySQL e outros serviços. Um exemplo básico do conteúdo do arquivo `.env` seria:

  ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
  ```

Substitua `usuario`, `senha`, e `nome_do_banco` pelos valores correspondentes ao seu ambiente.

3. Instale as dependências:
   
Após configurar o arquivo `.env`, instale as dependências necessárias para o backend com o comando:
  ```bash
  npm install
  ```

4. Realize a migração do banco de dados:
   
Para aplicar a migração inicial do banco de dados, execute o seguinte comando:
  ```bash
  npx prisma migrate dev
  ```

Este comando irá criar as tabelas e relações no banco de dados conforme definidas no modelo Prisma.

5. Gere os arquivos do Prisma:
   
Para garantir que o Prisma esteja gerando os arquivos corretamente, execute o comando:
  ```bash
  npx prisma generate
  ```

6. Inicie o servidor backend:
   
Após realizar as migrações e gerar os arquivos necessários, você pode iniciar o servidor backend com o comando:
  ```
  npm run dev
  ```
Isso fará o servidor backend iniciar no ambiente de desenvolvimento e estará pronto para receber requisições.


### Configuração do Frontend 🎨

1. Navegue até a pasta do frontend:
  ```bash
  cd frontend
  ```

2. Instale as dependências:
   
O primeiro passo é instalar todas as dependências necessárias para o frontend. Para isso, execute o seguinte comando:

  ```bash
  npm install
  ```

3. Inicie o servidor frontend:

Após a instalação das dependências, você pode iniciar o servidor frontend. Para isso, execute o comando:
```bash
npm run dev
```

O comando irá iniciar o servidor de desenvolvimento na URL:
```bash
http://localhost:5173/
```


## 🛠️ Funcionalidades

- **Cadastro de Continentes**: Permite criar, visualizar, atualizar e excluir continentes.
- **Cadastro de Países**: Cada país está vinculado a um continente. Permite listar países por continente.
- **Cadastro de Cidades**: Cada cidade está vinculada a um país. Permite listar cidades por país e/ou continente.
- **Integração com APIs Externas**: Integração com APIs para fornecer dados como informações de países, moedas, clima, e mapas.

## 🗄️ Banco de Dados

O banco de dados utiliza o **MySQL** e o acesso é feito através do **Prisma ORM**. A estrutura do banco segue as relações:

- **Continente → País → Cidade**
