const User = require('../models/users');
const { compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');

const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class UserController {
    async criarConta(request, response) {
        try {
            const { nome, sexo, cpf, endereco, email, senha, data_nascimento } = request.body;

            if (!nome || !sexo || !cpf || !email || !senha || !data_nascimento) {
                return response.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos' });
            }

            if (padraoEmail.test(email) === false) {
                return response.status(400).json({ mensagem: 'O email está no formato inválido' });
            }

            if (!(senha.length >= 8 && senha.length <= 16)) {
                return response.status(400).json({ mensagem: 'A senha deve ter entre 8 e 16 dígitos' });
            }

            const usuarioExistente = await User.findOne({ where: { email } });
            const cpfExistente = await User.findOne({ where: { cpf } });

            if (usuarioExistente || cpfExistente) {
                return response.status(409).json({ mensagem: 'Conta ou CPF já existe' });
            }

            const usuario = await User.create({
                nome,
                sexo,
                cpf,
                endereco,
                email,
                senha,
                data_nascimento
            });

            response.status(201).json({
                nome: usuario.nome,
                email: usuario.email,
                createdAt: usuario.createdAt
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({ mensagem: 'Não foi possível criar a conta' });
        }
    }

    async login(request, response) {
        const { email, senha } = request.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return response.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            const isPasswordValid = compareSync(senha, user.senha);
            if (!isPasswordValid) {
                return response.status(401).json({ mensagem: 'Senha incorreta' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return response.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ mensagem: 'Erro ao realizar login' });
        }
    }

    async listarUsuarios(request, response) {
        try {
            const usuarios = await User.findAll();

            if (usuarios.length === 0) {
                return response.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            return response.status(200).json({
                mensagem: 'Usuário listado com sucesso',
                usuarios
            });
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            return response.status(500).json({ mensagem: 'Erro ao listar usuários' });
        }
    }
}

module.exports = new UserController();