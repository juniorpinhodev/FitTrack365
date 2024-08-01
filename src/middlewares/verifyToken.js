const { verify } = require('jsonwebtoken');

function verifyToken(request, response, next) {
    try {
        const token = request.headers.authorization;

        if (!token) {
            return response
                .status(400)
                .json({ mensagem: 'Token ausente. Por favor, forneça um token válido.' });
        }

        const jwt = token.split(" ");

        // Verifique o token JWT usando a chave secreta
        const result = verify(jwt[1], process.env.JWT_SECRET);

        // Anexe o ID do usuário ao objeto de solicitação
        request.usuarioId = result.id;

        next();
    } catch (error) {
        console.error(error);
        if (error.message === "jwt malformed" || error.message === "jwt expired") {
            return response.status(401).json({ mensagem: 'Token inválido ou expirado. Acesso negado.' });
        } else {
            return response.status(500).json({ mensagem: 'Erro ao processar a requisição. Tente novamente mais tarde.' });
        }
    }
}

module.exports = verifyToken;