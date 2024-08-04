const { verify } = require('jsonwebtoken');

function verifyToken(request, response, next) {
    try {
        // Verifique se o cabeçalho de autorização está presente
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            return response
                .status(400)
                .json({ mensagem: 'Token ausente. Por favor, forneça um token válido.' });
        }

        // Verifique o formato do token
        const [scheme, token] = authorizationHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return response
                .status(400)
                .json({ mensagem: 'Formato do token inválido. Use o formato "Bearer {token}".' });
        }

        // Verifique o token JWT usando a chave secreta
        const result = verify(token, process.env.JWT_SECRET);

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