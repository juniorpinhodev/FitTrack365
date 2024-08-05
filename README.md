# Fittrack365

**Fittrack365 é uma plataforma destinada ao gerenciamento de exercícios físicos e à localização de locais adequados para a prática de atividades físicas. 
Esta plataforma integra recursos para cadastro de novos usuários, logins, cadastro, busca, edição e exclusão de locais para exercícios físicos.

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) Node.js
- ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) Express
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) PostgreSQL
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=white) Sequelize

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

```plaintext
src/
├── config/
│   └── database.config.js        # Conexão com o banco de dados
├── controllers/
│   ├── LocalController.js        # Controlador para locais
│   └── UserController.js         # Controlador para usuários
├── database/
│   ├── connection.js             # Configuração da conexão com o PostgreSQL
│   └── migrations/               # Scripts de migração
├── middlewares/
│   └── verifyToken.js            # Middleware para verificação de token JWT
├── models/
│   ├── exerciseLocal.js          # Modelo de dados para locais de exercícios
│   └── users.js                  # Modelo de dados para usuários
├── routes/
│   ├── local.routes.js           # Rotas para gerenciamento de locais
│   ├── routes.js                 # Define as rotas principais
│   └── users.routes.js           # Rotas para gerenciamento de usuários
├── index.js                      # Ponto de entrada da aplicação
└── server.js                     # Configura o servidor Express e middlewares
```
## Diagrama do projeto

### Fluxo de Dados
Este projeto segue um fluxo de dados organizado e estruturado para garantir a eficiência e clareza na comunicação entre o cliente e o servidor. O diagrama abaixo ilustra o processo de requisição e resposta, detalhando as interações entre o frontend, o backend e o banco de dados.

![Diagrama](https://github.com/juniorpinhodev/assets/blob/main/Fittrack365/diagramafit365.png)

### Explicação do Fluxo:
- Usuário: Inicia uma requisição ao servidor.
- Frontend: Transmite a requisição para o backend.
- Backend (Node.js): Recebe a requisição e encaminha para a rota apropriada.
- Roteamento (src/routes/): Identifica a rota correta e aciona o controlador correspondente.
- Controlador (src/controllers/): Processa a requisição e solicita os dados necessários ao modelo.
- Modelo (src/models/): Executa consultas no banco de dados e retorna os dados solicitados ao controlador.
- Controlador (src/controllers/): Processa os dados retornados pelo modelo e prepara a resposta.
- Rota (src/routes/): Envia a resposta processada de volta ao cliente.
- Usuário: Recebe a resposta final.

# A execução do projeto
## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (v12 ou superior ou o banco de dados da sua preferência)

A seguir, apresentamos os passos detalhados para configurar e executar o projeto Fittrack365 localmente em seu ambiente de produção e/ou desenvolvimento:

## Passos para Executar o Projeto Localmente

### 1. Clone o Repositório

Abra o terminal e clone o repositório:

```bash
git clone https://github.com/seu_usuario/fittrack365.git
```

### 2. Navegue até o Diretório do Projeto
```
cd fittrack365
```

### 3. Instale as Dependências
Instale as dependências do projeto usando npm:
```
npm install
```
### 4. Configure o Banco de Dados
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```
APP_PORT=3000 

DB_HOST=localhost
DB_DATABASE=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DIALECT=postgres

JWT_SECRET=ChaveSecretaJWT
```
**Substitua pelos valores apropriados.**

### 5. Execute as Migrações
Crie as tabelas no banco de dados:

```
npx sequelize-cli db:migrate
```

### 6. Inicie o Servidor
Inicie o servidor para rodar a aplicação:

Comando para executar o projeto em ambiente de Produção:
```
npm start
```
Caso deseje executar o projeto em ambiente de Desenvolvimento:

```
npm run dev
```
O servidor estará disponível em http://localhost:3000 (ou na porta especificada na variável de ambiente APP_PORT).

## Modelos de Banco de Dados:
```
users
 id: INTEGER, PK, Auto-increment
 nome: STRING
 sexo: ENUM('Masculino', 'Feminino', 'Outro')
 cpf: STRING(11), Único
 endereco: STRING
 email: STRING, Único
 senha: STRING
 data_nascimento: DATEONLY
```
```
exercise_locals
 id: INTEGER, PK, Auto-increment
 nome: STRING
 descricao: STRING
 localidade: STRING
 latitude: FLOAT
 longitude: FLOAT
 google_maps_link: STRING
 usuarioId: INTEGER, FK (referencia a users)
```

## Rotas da API
Usuários
- POST /usuario: Criar uma nova conta de usuário
- POST /usuario/login: Login de usuário
- GET /usuario: Listar todos os usuários
  
Locais
- POST /local: Criar um novo local (requisição com token JWT)
- GET /local: Listar todos os locais do usuário autenticado (requisição com token JWT)
- GET /local/:local_id: Listar um local específico do usuário autenticado (requisição com token JWT)
- PUT /local/:local_id: Atualizar um local específico do usuário autenticado (requisição com token JWT)
- DELETE /local/:local_id: Excluir um local específico do usuário autenticado (requisição com token JWT)
- GET /local/:local_id/maps: Obter o link do Google Maps para um local específico do usuário autenticado (requisição com token JWT)


## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Agradecimentos

Gostaríamos de agradecer ao Projeto Floripa Mais Tec, LAB365 e aos professores.

Muito obrigado a todos!







