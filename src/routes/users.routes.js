const { Router } = require('express');
const router = Router();

// obter todos os usuários
router.get('/', (req, res) => {
    res.send('Lista de usuários');
});

// cria um novo usuário
router.post('/', (req, res) => {
    res.send('Criar um novo usuário');
});

// edita um usuário existente
router.put('/:id', (req, res) => {
    res.send(`Atualizar o usuário com ID ${req.params.id}`);
});

// deletar um usuário
router.delete('/:id', (req, res) => {
    res.send(`Deletar o usuário com ID ${req.params.id}`);
});

module.exports = router;
