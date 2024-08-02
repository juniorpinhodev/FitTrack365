const { Router } = require('express');
const LocalController = require('../controllers/LocalController');

const localRoutes = new Router();

// Rota para criar um novo local
localRoutes.post('/', LocalController.criar);

module.exports = localRoutes;
