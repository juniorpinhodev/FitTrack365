const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes'); // Apenas importa as rotas principais
const connection = require('./database/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/doc.swagger.json');
const APP_PORT = process.env.APP_PORT || 3000;

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    this.routes(server);
    this.initializeServer(server);
  }

  middlewares(server) {
    console.log("Executando os middlewares");
    server.use(cors());
    server.use(express.json());
    console.log("Middlewares executados");
  }

  async database() {
    try {
      console.log("Conectando ao banco de dados");
      await connection.authenticate();
      console.log("Banco de dados conectado com sucesso!");
    } catch (error) {
      console.log("Erro ao conectar ao banco de dados: ", error);
    }
  }

  routes(server) {
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    server.use('/', routes); // Configura as rotas principais
  }

  initializeServer(server) {
    server.listen(APP_PORT, () => {
      console.log(`Servidor rodando na porta ${APP_PORT}!`);
    });
  }
}

module.exports = { Server };