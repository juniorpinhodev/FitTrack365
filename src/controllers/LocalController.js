const axios = require('axios');
const ExerciseLocal = require('../models/exerciseLocal');  
const Usuario = require('../models/users');  

class LocalController {
  // Método para criar um novo local
  async criar(request, response) {
    try {
      const { nome, descricao, localidade, latitude, longitude, google_maps_link, usuarioId } = request.body;


      // Validação dos dados
      if (!nome || !localidade || !usuarioId) {
        return response.status(400).json({ mensagem: 'Nome do local, localidade e usuário são obrigatórios' });
      }

      // Verifica se o usuário existe
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return response.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      // Cria o local
      const local = await ExerciseLocal.create({
        nome,
        descricao,
        localidade,
        latitude,
        longitude,
        google_maps_link,
        usuarioId
      });
      
      return response.status(201).json({mensagem: 'Local cadastrado com sucesso!', local});
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

      return response.status(200).json({mensagem: 'Buscado com sucesso! Locais cadastrados por este usuário', locais});
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

      return response.status(200).json({ mensagem: 'Local buscado com sucesso!', local });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao buscar o local' });
    }
  }

  // Método para atualizar um local específico do usuário autenticado
  async atualizar(request, response) {
    try {
      const { local_id } = request.params;
      const { nome, localidade, descricao, latitude, longitude, google_maps_link } = request.body;
      const usuarioId = request.usuarioId;
  
      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await ExerciseLocal.findOne({ where: { id: local_id, usuarioId } });
  
      if (!local) {
        return response.status(404).json({ mensagem: 'Local não encontrado ou acesso não autorizado' });
      }
  
      // Atualiza o local
      local.nome = nome || local.nome;
      local.localidade = localidade || local.localidade;
      local.descricao = descricao || local.descricao;
      local.latitude = latitude !== undefined ? latitude : local.latitude;
      local.longitude = longitude !== undefined ? longitude : local.longitude;
      local.google_maps_link = google_maps_link || local.google_maps_link;
  
      await local.save();
  
      return response.status(200).json({ mensagem: 'Local editado com sucesso!', local });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: `Houve um erro ao atualizar o local: ${error.message}` });
    }
  }
  

  // Método para Deletar um local específico do usuário autenticado
  async excluir(request, response) {
    try {
      const { local_id } = request.params;
      const usuarioId = request.usuarioId;

      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await ExerciseLocal.findOne({ where: { id: local_id, usuarioId } });

      if (!local) {
        console.log('Local não encontrado ou acesso não autorizado');
        return response.status(404).json({ mensagem: 'Local não encontrado ou acesso não autorizado' });
      }

      // Exclui o local
      await local.destroy();
  
      return response.status(200).json({ mensagem: 'Local deletado com sucesso!', local });
      } catch (error) {
        console.error('Erro no método excluir:', error);

      // Mensagem detalhada de erro
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return response.status(400).json({ mensagem: 'Erro de restrição de chave estrangeira ao excluir o local.' });
      } else if (error.name === 'SequelizeDatabaseError') {
        return response.status(500).json({ mensagem: 'Erro no banco de dados ao excluir o local.' });
      } else {
        return response.status(500).json({ mensagem: 'Houve um erro ao excluir o local. Por favor, tente novamente mais tarde.' });
      }
    }
  }

  async getGoogleMapsLink(request, response) {
    try {
      const { local_id } = request.params;
      const usuarioId = request.usuarioId;
  
      // Encontra o local específico e verifica se pertence ao usuário autenticado
      const local = await ExerciseLocal.findOne({ where: { id: local_id, usuarioId } });
  
      if (!local) {
        return response.status(404).json({ mensagem: 'Local não encontrado ou acesso não autorizado' });
      }
  
      // Verifica se latitude e longitude estão presentes
      if (!local.latitude || !local.longitude) {
        return response.status(404).json({ mensagem: 'Coordenadas não encontradas para o endereço fornecido' });
      }
  
      // Gerar o link do Google Maps com base na latitude e longitude no formato correto
      const googleMapsLink = `https://www.google.com/maps/place/@${local.latitude},${local.longitude},15z`;
  
      return response.status(200).json({ mensagem: 'Mapa do local buscado com sucesso!', googleMapsLink });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao obter o link do Google Maps' });
    }
  }
  
  async buscarCoordenadas(request, response) {
    try {
      const { localidade } = request.query;
  
      // Verifica se o endereço foi fornecido
      if (!localidade) {
        return response.status(400).json({ mensagem: 'Endereço não fornecido' });
      }
  
      // Consulta a API do Nominatim para obter as coordenadas
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(localidade)}&format=json&limit=1`;
      const nominatimResponse = await axios.get(nominatimUrl);
      const [locationData] = nominatimResponse.data;
  
      if (!locationData) {
        return response.status(404).json({ mensagem: 'Coordenadas não encontradas para o endereço fornecido' });
      }
  
      // Gerar o link do Google Maps com base na latitude e longitude no formato correto
      const googleMapsLink = `https://www.google.com/maps/place/@${locationData.lat},${locationData.lon}`;
  
      return response.status(200).json({ googleMapsLink });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ mensagem: 'Houve um erro ao buscar as coordenadas' });
    }
  }

}

module.exports = new LocalController();