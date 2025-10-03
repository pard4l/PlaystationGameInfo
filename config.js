// PlayStation Game Info Extension - Configuration

const CONFIG = {
  // URLs e endpoints
  PLAYSTATION_URLS: [
    'https://www.playstation.com/pt-br/ps-plus/games/',
    'https://www.playstation.com/en-us/ps-plus/games/',
    'https://www.playstation.com/pt-br/ps-plus/games/*',
    'https://www.playstation.com/en-us/ps-plus/games/*'
  ],

  // Seletores CSS para detectar elementos de jogos
  GAME_SELECTORS: [
    '.game-card',
    '.product-card', 
    '.game-item',
    '[data-testid*="game"]',
    '.ps-plus-game',
    '.catalog-item',
    '.game-tile',
    '.product-tile',
    '.game-list-item',
    '.ps-plus-catalog-item'
  ],

  // Seletores para títulos de jogos
  TITLE_SELECTORS: [
    '.title',
    '.game-title',
    '.product-title',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    '[data-testid*="title"]',
    '.product-name',
    '.game-name'
  ],

  // Configurações do tooltip
  TOOLTIP: {
    maxWidth: 300,
    minWidth: 250,
    offsetX: 10,
    offsetY: -10,
    animationDuration: 200,
    zIndex: 10000
  },

  // Configurações de cache
  CACHE: {
    timeout: 5 * 60 * 1000, // 5 minutos
    maxSize: 100 // máximo de 100 itens no cache
  },

  // Configurações da API
  API: {
    timeout: 5000, // 5 segundos
    retryAttempts: 3,
    retryDelay: 1000 // 1 segundo
  },

  // Configurações de performance
  PERFORMANCE: {
    debounceDelay: 300, // delay para evitar muitas requisições
    observerThrottle: 100, // throttle para o MutationObserver
    maxConcurrentRequests: 3
  },

  // Configurações de acessibilidade
  ACCESSIBILITY: {
    announceTooltip: true,
    keyboardNavigation: true,
    highContrast: true,
    reducedMotion: true
  },

  // Configurações de debug
  DEBUG: {
    enabled: false, // mudar para true em desenvolvimento
    logLevel: 'info', // 'debug', 'info', 'warn', 'error'
    showTiming: false
  },

  // Configurações padrão do usuário
  DEFAULT_SETTINGS: {
    enabled: true,
    showMetacritic: true,
    showCoopInfo: true,
    showOnlineInfo: true,
    showLocalInfo: true,
    showPlatformInfo: false,
    tooltipDelay: 500, // delay antes de mostrar o tooltip
    tooltipDuration: 3000 // duração do tooltip (0 = infinito)
  },

  // Palavras que indicam que um elemento NÃO é um jogo
  NOT_GAME_WORDS: [
    'playstation', 'ps4', 'ps5', 'plus', 'store', 'download', 'buy', 'comprar',
    'price', 'preço', 'sale', 'promoção', 'new', 'novo', 'coming soon', 'em breve',
    'browse', 'navegar', 'search', 'buscar', 'filter', 'filtrar', 'sort', 'ordenar',
    'login', 'entrar', 'sign up', 'cadastrar', 'help', 'ajuda', 'support', 'suporte',
    'about', 'sobre', 'contact', 'contato', 'privacy', 'privacidade', 'terms', 'termos'
  ],

  // Configurações de tema
  THEME: {
    colors: {
      primary: '#003791',
      secondary: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      text: '#ffffff',
      textSecondary: '#e5e7eb'
    },
    fonts: {
      primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      size: {
        small: '12px',
        medium: '14px',
        large: '16px'
      }
    }
  }
};

// Função para obter configuração com fallback
function getConfig(path, defaultValue = null) {
  const keys = path.split('.');
  let value = CONFIG;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  
  return value;
}

// Função para atualizar configuração
function setConfig(path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let target = CONFIG;
  
  for (const key of keys) {
    if (!target[key] || typeof target[key] !== 'object') {
      target[key] = {};
    }
    target = target[key];
  }
  
  target[lastKey] = value;
}

// Exportar para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONFIG, getConfig, setConfig };
} else if (typeof window !== 'undefined') {
  window.PlayStationGameInfoConfig = { CONFIG, getConfig, setConfig };
}
