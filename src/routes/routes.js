const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');
const usersRoutes = require('./users.routes');
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');

const routes = new Router();

// Rota para acessar a documentação Swagger
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de login com validações
routes.post('/login', AuthController.loginValidations(), AuthController.login);

// Rotas protegidas
routes.use('/users', verifyToken, usersRoutes);

module.exports = routes;
