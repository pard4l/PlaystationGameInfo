// PlayStation Game Info Extension - Enhanced API
// Este arquivo implementa a API melhorada com cache local e tooltip aprimorado

class EnhancedPlayStationGameAPI {
  constructor() {
    console.log('🚀 EnhancedPlayStationGameAPI: Inicializando...');
    this.jsonURL = 'https://www.dropbox.com/scl/fi/70d7x7povm70vmfx9z2eh/4playReviewPsn.json?rlkey=1jhe4cwgg4y1fosya7nw7y494&e=2&st=fihs8gsk&dl=0';
    this.localData = null;
    this.isDataLoaded = false;
    this.loadingPromise = null;
    this.cache = new Map();
    this.cacheTimeout = 30 * 60 * 1000; // 30 minutos
    console.log('✅ EnhancedPlayStationGameAPI: Inicializada com sucesso');
  }

  /**
   * Carrega os dados do JSON uma única vez
   * @returns {Promise<Array>} Array com todos os jogos
   */
  async loadGameData() {
    console.log('📡 loadGameData chamado. isDataLoaded:', this.isDataLoaded);
    
    if (this.isDataLoaded) {
      console.log('✅ Dados já carregados, retornando cache');
      return this.localData;
    }

    if (this.loadingPromise) {
      console.log('⏳ Dados já sendo carregados, aguardando...');
      return this.loadingPromise;
    }

    console.log('🚀 Iniciando carregamento dos dados...');
    this.loadingPromise = this._fetchGameData();
    const result = await this.loadingPromise;
    console.log('✅ Dados carregados com sucesso. Total:', result ? result.length : 0);
    return result;
  }

  /**
   * Busca os dados do JSON remoto
   * @private
   */
  async _fetchGameData() {
    try {
      console.log('🔄 Tentando carregar dados dos jogos...');
      
      // Primeiro, tentar carregar do arquivo local (para desenvolvimento)
      try {
        console.log('📁 Tentando carregar arquivo local...');
        // Tentar primeiro da raiz
        let localResponse = await fetch(chrome.runtime.getURL('4playReviewPsn.json'));
        if (!localResponse.ok) {
          // Se não funcionar, tentar da pasta output
          localResponse = await fetch(chrome.runtime.getURL('output/4playReviewPsn.json'));
        }
        
        if (localResponse.ok) {
          this.localData = await localResponse.json();
          this.isDataLoaded = true;
          console.log(`✅ Dados carregados do arquivo local! ${this.localData.length} jogos disponíveis.`);
          return this.localData;
        }
      } catch (localError) {
        console.log('⚠️ Arquivo local não encontrado, tentando URL remota...');
      }
      
      // Se o arquivo local não funcionar, tentar a URL remota
      console.log('🌐 Tentando carregar da URL remota...');
      const response = await fetch(this.jsonURL);
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);
      }

      this.localData = await response.json();
      this.isDataLoaded = true;
      
      console.log(`✅ Dados carregados com sucesso! ${this.localData.length} jogos disponíveis.`);
      return this.localData;
    } catch (error) {
      console.error('❌ Erro ao carregar dados dos jogos:', error);
      console.log('🔄 Tentando usar dados de fallback...');
      
      // Usar dados de fallback se tudo falhar
      this.localData = this._getFallbackData();
      this.isDataLoaded = true;
      
      console.log(`⚠️ Usando dados de fallback! ${this.localData.length} jogos disponíveis.`);
      return this.localData;
    }
  }

  /**
   * Retorna dados de fallback quando não consegue carregar o arquivo
   * @private
   */
  _getFallbackData() {
    return [
      {
        "name": "ALIENATION™",
        "psnGenres": "ACTION, SHOOTER, ACTION",
        "metacriticName": "Alienation",
        "metacriticGenres": "Top-Down Shoot-'Em-Up",
        "score": 79,
        "url": "/game/alienation/critic-reviews/",
        "psnInfo": {
          "titulo": "Alienation",
          "genero": "Twin Stick Shooter game",
          "online": "4",
          "local": "4",
          "local+online": "No disponible",
          "coop": "YES",
          "split-screen": "NO",
          "supports drop-in/drop-out co-op": "YES",
          "info1": "Supports Drop-In/Drop-Out Co-Op",
          "info2": "",
          "info3": "",
          "info4": ""
        }
      },
      {
        "name": "The Last of Us Part II™",
        "psnGenres": "ACTION, ADVENTURE",
        "metacriticName": "The Last of Us Part II",
        "metacriticGenres": "Action Adventure",
        "score": 93,
        "url": "/game/the-last-of-us-part-ii/critic-reviews/",
        "psnInfo": {
          "titulo": "The Last of Us Part II",
          "genero": "Action Adventure",
          "online": "No disponible",
          "local": "No disponible",
          "local+online": "No disponible",
          "coop": "No",
          "split-screen": "NO",
          "supports drop-in/drop-out co-op": "NO",
          "info1": "",
          "info2": "",
          "info3": "",
          "info4": ""
        }
      },
      {
        "name": "Horizon Zero Dawn™",
        "psnGenres": "ACTION, ADVENTURE",
        "metacriticName": "Horizon Zero Dawn",
        "metacriticGenres": "Action Adventure",
        "score": 89,
        "url": "/game/horizon-zero-dawn/critic-reviews/",
        "psnInfo": {
          "titulo": "Horizon Zero Dawn",
          "genero": "Action Adventure",
          "online": "No disponible",
          "local": "No disponible",
          "local+online": "No disponible",
          "coop": "No",
          "split-screen": "NO",
          "supports drop-in/drop-out co-op": "NO",
          "info1": "",
          "info2": "",
          "info3": "",
          "info4": ""
        }
      }
    ];
  }

  /**
   * Normaliza o nome do jogo para busca
   * @param {string} name - Nome do jogo
   * @returns {string} Nome normalizado
   */
  normalizeGameName(name) {
    return name
      .toLowerCase()
      .replace(/[™®©]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Busca informações de um jogo específico
   * @param {string} gameName - Nome do jogo
   * @returns {Promise<Object|null>} Dados do jogo ou null se não encontrado
   */
  async getGameInfo(gameName) {
    console.log('🔍 getGameInfo chamado para:', gameName);
    
    // Verificar cache primeiro
    const cached = this.getFromCache(gameName);
    if (cached) {
      console.log('📦 Dados encontrados no cache para:', gameName);
      return cached;
    }

    // Garantir que os dados estão carregados
    console.log('📡 Carregando dados da API...');
    await this.loadGameData();
    console.log('✅ Dados carregados. Total de jogos:', this.localData ? this.localData.length : 0);

    const normalizedSearchName = this.normalizeGameName(gameName);
    console.log('📝 Nome normalizado:', normalizedSearchName);
    
    let bestMatch = null;
    let bestScore = 0;

    // Buscar o melhor match
    for (const game of this.localData) {
      const normalizedGameName = this.normalizeGameName(game.name);
      
      // Match exato
      if (normalizedGameName === normalizedSearchName) {
        bestMatch = game;
        bestScore = 1.0;
        console.log('✅ Match exato encontrado:', game.name);
        break;
      }

      // Match parcial
      const similarity = this.calculateSimilarity(normalizedSearchName, normalizedGameName);
      if (similarity > bestScore && similarity > 0.7) {
        bestMatch = game;
        bestScore = similarity;
        console.log('🔍 Match parcial:', game.name, 'Score:', similarity.toFixed(2));
      }
    }

    if (bestMatch) {
      console.log('🎮 Jogo encontrado:', bestMatch.name, 'Score:', bestScore);
      const formattedData = this.formatGameDataForTooltip(bestMatch);
      console.log('📊 Dados formatados:', formattedData);
      this.setCache(gameName, formattedData);
      return formattedData;
    }

    console.log('❌ Jogo não encontrado:', gameName);
    return null;
  }

  /**
   * Calcula similaridade entre duas strings
   * @param {string} str1 - Primeira string
   * @param {string} str2 - Segunda string
   * @returns {number} Score de similaridade (0-1)
   */
  calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    
    let matches = 0;
    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1 === word2 || word1.includes(word2) || word2.includes(word1)) {
          matches++;
          break;
        }
      }
    }
    
    return matches / Math.max(words1.length, words2.length);
  }

  /**
   * Formata os dados do jogo para o tooltip
   * @param {Object} gameData - Dados brutos do jogo
   * @returns {Object} Dados formatados para o tooltip
   */
  formatGameDataForTooltip(gameData) {
    const psnInfo = gameData.psnInfo || {};
    
    return {
      name: gameData.name,
      metacriticScore: gameData.score,
      metacriticGenres: gameData.metacriticGenres,
      psnGenres: gameData.psnGenres,
      
      // Informações de multiplayer
      online: psnInfo.online || 'No disponible',
      local: psnInfo.local || 'No disponible',
      'local+online': psnInfo['local+online'] || 'No disponible',
      
      // Informações de coop
      coop: psnInfo.coop || 'No',
      splitScreen: psnInfo['split-screen'] || 'NO',
      dropInDropOut: psnInfo['supports drop-in/drop-out co-op'] || 'NO',
      
      // Informações adicionais
      info1: psnInfo.info1 || '',
      info2: psnInfo.info2 || '',
      info3: psnInfo.info3 || '',
      info4: psnInfo.info4 || '',
      
      // URL do Metacritic
      metacriticUrl: gameData.url ? `https://www.metacritic.com${gameData.url}` : null
    };
  }

  /**
   * Retorna a cor baseada no score do Metacritic
   * @param {number} score - Score do Metacritic
   * @returns {string} Cor em hexadecimal
   */
  getScoreColor(score) {
    if (!score) return '#666666';
    
    if (score >= 90) return '#00ff00'; // Verde - Excelente
    if (score >= 80) return '#90ee90'; // Verde claro - Muito bom
    if (score >= 70) return '#ffff00'; // Amarelo - Bom
    if (score >= 60) return '#ffa500'; // Laranja - Regular
    return '#ff0000'; // Vermelho - Ruim
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

  /**
   * Recarrega os dados (útil para atualizações)
   */
  async reloadData() {
    this.isDataLoaded = false;
    this.loadingPromise = null;
    this.clearCache();
    return await this.loadGameData();
  }

  /**
   * Retorna estatísticas dos dados carregados
   */
  getDataStats() {
    if (!this.isDataLoaded) {
      return { loaded: false };
    }

    const totalGames = this.localData.length;
    const gamesWithCoop = this.localData.filter(game => 
      game.psnInfo && game.psnInfo.coop === 'YES'
    ).length;
    const gamesWithMetacritic = this.localData.filter(game => 
      game.score && game.score > 0
    ).length;

    return {
      loaded: true,
      totalGames,
      gamesWithCoop,
      gamesWithMetacritic,
      cacheSize: this.cache.size
    };
  }
}

// Exemplo de uso:
/*
const api = new EnhancedPlayStationGameAPI();

// Buscar informações de um jogo
api.getGameInfo('The Last of Us Part II')
  .then(gameInfo => {
    console.log('Informações do jogo:', gameInfo);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

// Verificar estatísticas
const stats = api.getDataStats();
console.log('Estatísticas:', stats);
*/

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedPlayStationGameAPI;
}
