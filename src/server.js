const express = require("express");
const cors = require('cors');
const routes = require("./routes/routes");
const connection = require("./database/connection");
const APP_PORT = process.env.APP_PORT;

class Server {
    
    constructor(server = express()) {
        this.middlewares(server);
        this.database();
        server.use(routes);
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
            console.log("Conectado ao banco de dados com sucesso");
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados: ", error);
        }
    }

    initializeServer(server) {
        server.listen(APP_PORT, () => {
            console.log(`Servidor rodando na porta ${APP_PORT}!`);
        });
    }
}

module.exports = { Server };
