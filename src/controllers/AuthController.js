const { body, validationResult } = require('express-validator');
const { compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

class AuthController {
    static loginValidations() {
        return [
            body('email').isEmail().withMessage('Email inválido'),
            body('senha').isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
        ];
    }

    static async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, senha } = req.body;

        try {
            // Verifica se o usuário existe
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            // Verifica a senha
            const isPasswordValid = compareSync(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }

            // Gera o token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '7d', // Tempo de expiração do token
            });

            // Retorna o token
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao realizar login' });
        }
    }
}

module.exports = AuthController;