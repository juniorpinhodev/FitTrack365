const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API FitTrack365',
        description: 'API para o projeto FitTrack365',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    security: [{'apiKeyAuth': []}],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: "Bearer <token>"
        }
    }
};

const arquivoSaida = './src/routes/doc.swagger.json';
const arquivoRotas = ['./src/index.js'];

swaggerAutogen(arquivoSaida, arquivoRotas, doc);
