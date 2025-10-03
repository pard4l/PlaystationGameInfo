// PlayStation Game Info Extension - API Example
// Este arquivo demonstra como a API real funcionará no futuro

class PlayStationGameAPI {
  constructor() {
    this.baseURL = 'https://api.playstation-games.com/v1'; // URL fictícia
    this.apiKey = 'your-api-key-here';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
  }

  /**
   * Busca informações de um jogo específico
   * @param {string} gameName - Nome do jogo
   * @returns {Promise<Object>} Dados do jogo
   */
  async getGameInfo(gameName) {
    // Verificar cache primeiro
    const cached = this.getFromCache(gameName);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${this.baseURL}/games/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'User-Agent': 'PlayStation-Game-Info-Extension/1.0.0'
        },
        body: JSON.stringify({
          query: gameName,
          include: ['coop', 'online', 'local', 'metacritic', 'platforms']
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const gameInfo = this.formatGameData(data);

      // Armazenar no cache
      this.setCache(gameName, gameInfo);

      return gameInfo;
    } catch (error) {
      console.error('Erro ao buscar dados do jogo:', error);
      throw error;
    }
  }

  /**
   * Formata os dados da API para o formato da extensão
   * @param {Object} apiData - Dados brutos da API
   * @returns {Object} Dados formatados
   */
  formatGameData(apiData) {
    const game = apiData.games[0]; // Assumindo que retorna array de jogos

    return {
      name: game.title,
      coop: game.multiplayer?.coop ? 'YES' : 'NO',
      online: game.multiplayer?.online ? `${game.multiplayer.online.maxPlayers} players` : 'not available',
      local: game.multiplayer?.local ? `${game.multiplayer.local.maxPlayers} players` : 'not available',
      'online + local': game.multiplayer?.online && game.multiplayer?.local ? 'YES' : 'not available',
      metacritic: game.ratings?.metacritic || null,
      platforms: game.platforms || [],
      releaseDate: game.releaseDate,
      developer: game.developer,
      publisher: game.publisher,
      genres: game.genres || []
    };
  }

  /**
   * Busca jogos por categoria (ex: PS Plus, PS Now)
   * @param {string} category - Categoria dos jogos
   * @returns {Promise<Array>} Lista de jogos
   */
  async getGamesByCategory(category) {
    try {
      const response = await fetch(`${this.baseURL}/games/category/${category}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'User-Agent': 'PlayStation-Game-Info-Extension/1.0.0'
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.games;
    } catch (error) {
      console.error('Erro ao buscar jogos por categoria:', error);
      throw error;
    }
  }

  /**
   * Busca jogos similares
   * @param {string} gameName - Nome do jogo base
   * @returns {Promise<Array>} Lista de jogos similares
   */
  async getSimilarGames(gameName) {
    try {
      const response = await fetch(`${this.baseURL}/games/similar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'User-Agent': 'PlayStation-Game-Info-Extension/1.0.0'
        },
        body: JSON.stringify({ gameName })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.similarGames;
    } catch (error) {
      console.error('Erro ao buscar jogos similares:', error);
      throw error;
    }
  }

  /**
   * Gerencia o cache de dados
   */
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

// Exemplo de uso:
/*
const api = new PlayStationGameAPI();

// Buscar informações de um jogo
api.getGameInfo('The Last of Us Part II')
  .then(gameInfo => {
    console.log('Informações do jogo:', gameInfo);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

// Buscar jogos do PS Plus
api.getGamesByCategory('ps-plus')
  .then(games => {
    console.log('Jogos do PS Plus:', games);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
*/

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlayStationGameAPI;
}
