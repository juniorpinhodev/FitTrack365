const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');
const usersRoutes = require('./users.routes');
const UserController = require('../controllers/UserController');
const localRoutes = require('./local.routes');

const routes = new Router();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.post('/login', UserController.login);
routes.use('/usuario', usersRoutes);
routes.use('/local', localRoutes);

module.exports = routes;