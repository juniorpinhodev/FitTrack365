const { Router } = require('express');
const LocalController = require('../controllers/LocalController');
const verifyToken = require('../middlewares/verifyToken');

const localRoutes = new Router();

// Rota para criar um novo local
localRoutes.post('/', verifyToken, LocalController.criar);

// Rota para listar todos os locais do usuário autenticado
localRoutes.get('/', verifyToken, LocalController.listar);

module.exports = localRoutes;