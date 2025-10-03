// PlayStation Game Info Extension - API Local
// Versão simplificada que carrega dados localmente para teste

class LocalPlayStationGameAPI {
  constructor() {
    console.log('🚀 LocalPlayStationGameAPI: Inicializando...');
    this.localData = null;
    this.isDataLoaded = false;
    this.cache = new Map();
    console.log('✅ LocalPlayStationGameAPI: Inicializada com sucesso');
  }

  /**
   * Carrega os dados do JSON local
   */
  async loadGameData() {
    console.log('📡 loadGameData chamado. isDataLoaded:', this.isDataLoaded);
    
    if (this.isDataLoaded) {
      console.log('✅ Dados já carregados, retornando cache');
      return this.localData;
    }

    try {
      console.log('🚀 Carregando dados locais...');
      
      // Simular carregamento dos dados (em produção seria fetch)
      // Por enquanto, vamos usar dados mockados para teste
      this.localData = [
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
        }
      ];
      
      this.isDataLoaded = true;
      console.log('✅ Dados carregados com sucesso. Total:', this.localData.length);
      return this.localData;
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      throw error;
    }
  }

  /**
   * Normaliza o nome do jogo para busca
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
   * Calcula similaridade entre duas strings
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
   * Busca informações de um jogo específico
   */
  async getGameInfo(gameName) {
    console.log('🔍 getGameInfo chamado para:', gameName);
    
    // Verificar cache primeiro
    if (this.cache.has(gameName)) {
      console.log('📦 Dados encontrados no cache para:', gameName);
      return this.cache.get(gameName);
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
      this.cache.set(gameName, formattedData);
      return formattedData;
    }

    console.log('❌ Jogo não encontrado:', gameName);
    return null;
  }

  /**
   * Formata os dados do jogo para o tooltip
   */
  formatGameDataForTooltip(gameData) {
    return {
      name: gameData.name,
      metacriticScore: gameData.score,
      metacriticGenres: gameData.metacriticGenres,
      metacriticUrl: gameData.url ? `https://www.metacritic.com${gameData.url}` : null,
      online: gameData.psnInfo.online,
      local: gameData.psnInfo.local,
      'local+online': gameData.psnInfo['local+online'],
      coop: gameData.psnInfo.coop,
      'split-screen': gameData.psnInfo['split-screen'],
      'supports drop-in/drop-out co-op': gameData.psnInfo['supports drop-in/drop-out co-op'],
      info1: gameData.psnInfo.info1,
      info2: gameData.psnInfo.info2,
      info3: gameData.psnInfo.info3,
      info4: gameData.psnInfo.info4
    };
  }

  /**
   * Retorna a cor baseada no score do Metacritic
   */
  getScoreColor(score) {
    if (!score) return '#666666';
    
    if (score >= 90) return '#00ff00'; // Verde - Excelente
    if (score >= 80) return '#90ee90'; // Verde claro - Muito bom
    if (score >= 70) return '#ffff00'; // Amarelo - Bom
    if (score >= 60) return '#ffa500'; // Laranja - Regular
    return '#ff0000'; // Vermelho - Ruim
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.LocalPlayStationGameAPI = LocalPlayStationGameAPI;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LocalPlayStationGameAPI;
}

// Para Node.js
if (typeof global !== 'undefined') {
  global.LocalPlayStationGameAPI = LocalPlayStationGameAPI;
}
