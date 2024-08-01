const { Server } = require('./server');

new Server();

//

// const { connection } = require('./models');

// // Sincronizar os modelos com o banco de dados
// connection.sync({ alter: true }).then(() => {
//   console.log('Modelos sincronizados com o banco de dados');
// }).catch(error => {
//   console.error('Erro ao sincronizar modelos:', error);
// });

