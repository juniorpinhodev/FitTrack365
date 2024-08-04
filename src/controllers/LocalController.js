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

  // Método para listar todos os locais do usuário autenticado
  async listar(request, response) {
    try {
      const usuarioId = request.usuarioId;

      // Encontra todos os locais do usuário autenticado
      const locais = await ExerciseLocal.findAll({ where: { usuarioId } });

      return response.status(200).json(locais);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao listar os locais' });
    }
  }
  
  // Método para listar um local específico do usuário autenticado
  async listarPorId(request, response) {
    try {
      const { local_id } = request.params;
      const usuarioId = request.usuarioId;

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await ExerciseLocal.findOne({ where: { id: local_id, usuarioId } });

      if (!local) {
        return response.status(404).json({ mensagem: 'Local não encontrado ou acesso não autorizado' });
      }

      return response.status(200).json(local);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao buscar o local' });
    }
  }

  // Método para atualizar um local específico do usuário autenticado
  async atualizar(request, response) {
    try {
      const { local_id } = request.params;
      const { nome, endereco, descricao, coordenadas, google_maps_link } = request.body;
      const usuarioId = request.usuarioId;

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await ExerciseLocal.findOne({ where: { id: local_id, usuarioId } });

      if (!local) {
        return response.status(404).json({ mensagem: 'Local não encontrado ou acesso não autorizado' });
      }

      // Atualiza o local
      local.nome = nome || local.nome;
      local.localidade = endereco || local.localidade;
      local.descricao = descricao || local.descricao;
      local.coordenadas = coordenadas || local.coordenadas;
      local.google_maps_link = google_maps_link || local.google_maps_link;

      await local.save();

      return response.status(200).json(local);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao atualizar o local' });
    }
  }

  // Método para excluir um local específico do usuário autenticado
  async excluir(request, response) {
    try {
      const { local_id } = request.params;
      const usuarioId = request.usuarioId;

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await ExerciseLocal.findOne({ where: { id: local_id, usuarioId } });

      if (!local) {
        return response.status(404).json({ mensagem: 'Local não encontrado ou acesso não autorizado' });
      }

      // Exclui o local
      await local.destroy();

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao excluir o local' });
    }
  }

}

module.exports = new LocalController();