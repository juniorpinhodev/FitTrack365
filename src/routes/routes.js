const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');
const usersRoutes = require('./users.routes');
const localRoutes = require('./local.routes');

const routes = new Router();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/usuario', usersRoutes); // Define as rotas de usuário no caminho /usuario
routes.use('/local', localRoutes);

module.exports = routes;