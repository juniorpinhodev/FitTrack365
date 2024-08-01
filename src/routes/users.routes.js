const { Router } = require('express');
const UserController = require('../controllers/UserController');

const usersRoutes = new Router();

usersRoutes.post('/', UserController.criarConta);

module.exports = usersRoutes;
