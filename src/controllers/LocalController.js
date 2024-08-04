const ExerciseLocal = require('../models/exerciseLocal');  
const Usuario = require('../models/users');  

class LocalController {
  // Método para criar um novo local
  async criar(request, response) {
    try {
      const { nome, endereco, descricao, coordenadas, google_maps_link, usuarioId } = request.body;

      // Validação dos dados
      if (!nome || !endereco || !usuarioId) {
        return response.status(400).json({ mensagem: 'Nome do local, endereço e usuário são obrigatórios' });
      }

      // Verifica se o usuário existe
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return response.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      // Cria o local
      const local = await ExerciseLocal.create({ nome, descricao, localidade: endereco, coordenadas, google_maps_link });
      return response.status(201).json(local);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao cadastrar o local' });
    }
  }
}

module.exports = new LocalController();