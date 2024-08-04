const { Router } = require('express');
const UserController = require('../controllers/UserController');

const usersRoutes = new Router();

usersRoutes.post('/', UserController.criarConta);
usersRoutes.post('/login', UserController.login); 
usersRoutes.get('/', UserController.listarUsuarios);

module.exports = usersRoutes;
