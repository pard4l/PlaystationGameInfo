// PlayStation Game Info Extension - Content Script

class PlayStationGameInfo {
  constructor() {
    this.tooltip = null;
    this.currentGame = null;
    this.gameDataCache = new Map();
    this.hoverTimeout = null;
    this.init();
  }

  init() {
    // console.log('🎮 ===========================================');
    // console.log('🎮 PlayStation Game Info extension loaded');
    // console.log('🎮 ===========================================');
    // console.log('📍 Página atual:', window.location.href);
    // console.log('⏰ Timestamp:', new Date().toLocaleTimeString());
    this.createTooltip();
    this.observeGameElements();
  }

  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.id = 'ps-game-info-tooltip';
    this.tooltip.className = 'ps-game-info-tooltip';
    this.tooltip.style.display = 'none';
    document.body.appendChild(this.tooltip);
    // console.log('✅ Tooltip criado e adicionado ao DOM');
  }

  observeGameElements() {
    // Observer para detectar mudanças na página
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.attachEventListeners();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Attach listeners inicial
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Seletores específicos para cards de jogos na página do PlayStation Plus
    const gameSelectors = [
      // Seletores para links dentro de card-grid (estrutura atual)
      'div[class*="card-grid"] a',
      'div[class*="card-grid"] > a',
      '.card-grid a',
      '.card-grid > a',
      // Seletores mais específicos para cards de jogos
      '[data-testid*="game-card"]',
      '[data-testid*="product-card"]',
      '.ps-plus-catalog-item',
      '.catalog-item',
      '.game-card',
      '.product-card',
      '.game-item',
      '.game-tile',
      // Seletores para grid de jogos
      '.ps-plus-game-grid .ps-plus-catalog-item',
      '.catalog-grid .catalog-item',
      // Seletores mais genéricos como fallback
      '[data-testid*="game"]'
    ];

    gameSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log(`🎯 Encontrados ${elements.length} elementos com seletor: ${selector}`);
        // Log adicional para links dentro de card-grid
        if (selector.includes('card-grid')) {
          elements.forEach((element, index) => {
            if (index < 3) { // Log apenas os primeiros 3 para não poluir
              console.log(`🔗 Link ${index + 1}:`, element.tagName, element.className, element.href || element.textContent?.substring(0, 50));
            }
          });
        }
      }
      elements.forEach(element => {
        if (!element.hasAttribute('data-ps-game-info')) {
          element.setAttribute('data-ps-game-info', 'true');
          element.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
          element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
          element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        }
      });
    });

    // Fallback: procurar por elementos que contenham títulos de jogos
    // Temporariamente desabilitado para evitar tooltips em elementos incorretos
    // this.attachFallbackListeners();
  }

  attachFallbackListeners() {
    // Procurar por elementos que possam ser títulos de jogos
    const possibleGameElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .title, .game-title, .product-title');
    
    possibleGameElements.forEach(element => {
      if (!element.hasAttribute('data-ps-game-info-fallback')) {
        element.setAttribute('data-ps-game-info-fallback', 'true');
        element.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
        element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      }
    });
  }

  async handleMouseEnter(event) {
    // Limpar timeout anterior se existir
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    // Adicionar delay para evitar tooltips em passadas rápidas do mouse
    this.hoverTimeout = setTimeout(async () => {
      const gameName = this.extractGameName(event.target);
      if (!gameName) return;

      // Debug: Log do nome do jogo
      //alert('🎮 Nome do jogo detectado:', gameName);

      this.currentGame = gameName;
      await this.showGameInfo(gameName, event);
    }, 300); // 300ms de delay
  }

  handleMouseLeave(event) {
    // Limpar timeout se o mouse sair antes do delay
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    this.hideTooltip();
  }

  handleMouseMove(event) {
    if (this.tooltip && this.tooltip.style.display !== 'none') {
      this.updateTooltipPosition(event);
    }
  }

  extractGameName(element) {
    // Verificar se o elemento é realmente um card de jogo
    if (!this.isGameCard(element)) {
      console.log('🚫 Elemento não é um card de jogo:', element.tagName, element.className);
      return null;
    }

    // Tentar extrair o nome do jogo de diferentes formas
    let gameName = null;
    let extractionMethod = '';

    // 1. PRIORIDADE: Procurar especificamente por card_name__mLuPs
    const cardNameElement = element.querySelector('.card_name__mLuPs p, .card_name__mLuPs, div[class*="card_name"] p, div[class*="card_name"]');
    if (cardNameElement && cardNameElement.textContent?.trim()) {
      gameName = cardNameElement.textContent.trim();
      extractionMethod = 'card_name__mLuPs';
      console.log('✅ Nome encontrado no card_name:', gameName);
    }

    // 2. Se não encontrou no card_name, procurar em elementos pais
    if (!gameName && element.tagName.toLowerCase() === 'a') {
      let parentElement = element.parentElement;
      let searchDepth = 0;
      const maxDepth = 3; // Reduzir profundidade para ser mais eficiente
      
      while (parentElement && searchDepth < maxDepth) {
        const cardNameInParent = parentElement.querySelector('.card_name__mLuPs p, .card_name__mLuPs, div[class*="card_name"] p, div[class*="card_name"]');
        if (cardNameInParent && cardNameInParent.textContent?.trim()) {
          gameName = cardNameInParent.textContent.trim();
          extractionMethod = `card_name em pai (${searchDepth + 1} níveis)`;
          console.log('✅ Nome encontrado no card_name do pai:', gameName);
          break;
        }
        
        parentElement = parentElement.parentElement;
        searchDepth++;
      }
    }

    // 3. Procurar por atributos de dados específicos de jogos
    if (!gameName) {
      gameName = element.getAttribute('data-game-name') || 
                 element.getAttribute('data-product-name') ||
                 element.getAttribute('data-title') ||
                 element.getAttribute('title');
      
      if (gameName) {
        extractionMethod = 'atributo de dados';
      }
    }

    // 4. Se for um link, tentar extrair do href ou texto do link
    if (!gameName && element.tagName.toLowerCase() === 'a') {
      // Tentar extrair do href (pode conter nome do jogo)
      const href = element.getAttribute('href');
      if (href) {
        // Extrair nome do jogo da URL (ex: /games/game-name)
        const urlParts = href.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        if (lastPart && lastPart !== 'games' && !lastPart.includes('?')) {
          gameName = lastPart.replace(/-/g, ' ').replace(/_/g, ' ');
          extractionMethod = 'href do link';
        }
      }
      
      // Se não conseguiu do href, tentar do texto do link
      if (!gameName && element.textContent?.trim()) {
        gameName = element.textContent.trim();
        extractionMethod = 'texto do link';
      }
    }

    // 2. Procurar por elementos de título específicos dentro do card
    if (!gameName) {
      const titleSelectors = [
        // Seletores específicos para PlayStation Plus
        '.card_name__mLuPs p',
        '.card_name__mLuPs',
        'div[class*="card_name"] p',
        'div[class*="card_name"]',
        // Seletores genéricos
        '.game-title',
        '.product-title', 
        '.catalog-item-title',
        '.ps-plus-game-title',
        '[data-testid*="title"]',
        'h3', 'h4', 'h5', 'h6' // Evitar h1 e h2 que podem ser títulos da página
      ];
      
      for (const selector of titleSelectors) {
        const titleElement = element.querySelector(selector);
        if (titleElement && titleElement.textContent?.trim()) {
          gameName = titleElement.textContent.trim();
          extractionMethod = `elemento filho (${selector})`;
          break;
        }
      }
    }

    // 3. Procurar por alt text em imagens do card
    if (!gameName) {
      const imgElement = element.querySelector('img');
      if (imgElement) {
        gameName = imgElement.getAttribute('alt') || imgElement.getAttribute('title');
        if (gameName) {
          extractionMethod = 'alt text da imagem';
        }
      }
    }

    // 4. Se ainda não encontrou e é um link, procurar em elementos pais
    if (!gameName && element.tagName.toLowerCase() === 'a') {
      let parentElement = element.parentElement;
      let searchDepth = 0;
      const maxDepth = 5; // Limitar profundidade da busca
      
      while (parentElement && searchDepth < maxDepth) {
        // Procurar por card_name nos elementos pais
        const cardNameElement = parentElement.querySelector('.card_name__mLuPs p, .card_name__mLuPs, div[class*="card_name"] p, div[class*="card_name"]');
        if (cardNameElement && cardNameElement.textContent?.trim()) {
          gameName = cardNameElement.textContent.trim();
          extractionMethod = `elemento pai (${searchDepth + 1} níveis)`;
          break;
        }
        
        parentElement = parentElement.parentElement;
        searchDepth++;
      }
    }

    // Limpar e validar o nome do jogo
    if (gameName) {
      gameName = gameName.replace(/\s+/g, ' ').trim();
      // Filtrar nomes muito curtos ou que parecem não ser jogos
      if (gameName.length < 3 || this.isNotAGameName(gameName)) {
        console.log('🚫 Nome rejeitado (muito curto ou não é jogo):', gameName);
        return null;
      }
      
      // Debug: Log detalhado da extração
      console.log('✅ Nome extraído:', gameName, '| Método:', extractionMethod, '| Elemento:', element.tagName, element.className);
      console.log('🔍 Nome completo extraído:', JSON.stringify(gameName));
      
      // Log específico para card_name
      if (extractionMethod.includes('card_name')) {
        console.log('🎮 Nome do jogo encontrado no card_name:', gameName);
      }
      
      // Alert temporário para debug
      //alert(`Nome extraído: "${gameName}" | Método: ${extractionMethod}`);
    } else {
      console.log('❌ Nenhum nome encontrado no elemento:', element.tagName, element.className);
      //alert('❌ Nenhum nome encontrado no elemento: ' + element.tagName + ' ' + element.className);
    }

    return gameName;
  }

  isGameCard(element) {
    // Verificar se o elemento tem características de um card de jogo
    const className = element.className.toLowerCase();
    const tagName = element.tagName.toLowerCase();
    
    // Verificar se é um link dentro de card-grid
    if (tagName === 'a') {
      const parentElement = element.parentElement;
      if (parentElement && parentElement.className.toLowerCase().includes('card-grid')) {
        console.log('🔗 Link dentro de card-grid detectado:', element);
        return true;
      }
    }
    
    // Verificar classes que indicam cards de jogos
    const gameCardClasses = [
      'game-card',
      'product-card',
      'catalog-item',
      'ps-plus-catalog-item',
      'game-item',
      'game-tile',
      'product-tile',
      'card-grid' // Adicionar suporte para card-grid
    ];
    
    const hasGameCardClass = gameCardClasses.some(cls => className.includes(cls));
    
    // Verificar se tem atributos de dados de jogos
    const hasGameData = element.hasAttribute('data-game-name') || 
                       element.hasAttribute('data-product-name') ||
                       element.hasAttribute('data-testid');
    
    // Verificar se contém elementos típicos de cards de jogos
    const hasGameElements = element.querySelector('img') || 
                           element.querySelector('.title, .game-title, .product-title') ||
                           element.querySelector('[data-testid*="title"]');
    
    // Verificar se NÃO é um elemento de layout ou navegação
    const isNotLayoutElement = !className.includes('header') &&
                              !className.includes('nav') &&
                              !className.includes('footer') &&
                              !className.includes('menu') &&
                              !className.includes('banner') &&
                              !tagName.includes('header') &&
                              !tagName.includes('nav') &&
                              !tagName.includes('footer');
    
    const isGameCard = (hasGameCardClass || hasGameData || hasGameElements) && isNotLayoutElement;
    
    console.log('🔍 Verificando se é card de jogo:', {
      element: `${tagName}.${className}`,
      hasGameCardClass,
      hasGameData,
      hasGameElements,
      isNotLayoutElement,
      result: isGameCard
    });
    
    return isGameCard;
  }

  isNotAGameName(name) {
    const notGameWords = [
      'playstation', 'ps4', 'ps5', 'plus', 'store', 'download', 'buy', 'comprar',
      'price', 'preço', 'sale', 'promoção', 'new', 'novo', 'coming soon', 'em breve',
      'browse', 'navegar', 'search', 'buscar', 'filter', 'filtrar', 'sort', 'ordenar'
    ];
    
    const lowerName = name.toLowerCase();
    return notGameWords.some(word => lowerName.includes(word));
  }

  async showGameInfo(gameName, event) {
    try {
      // Mostrar loading
      this.showLoadingTooltip(event);

      // Buscar dados do jogo
      const gameData = await this.getGameData(gameName);
      
      if (gameData) {
        this.displayGameInfo(gameData, event);
      } else {
        this.showErrorTooltip(event, 'Informações não encontradas');
      }
    } catch (error) {
      console.error('Erro ao buscar informações do jogo:', error);
      this.showErrorTooltip(event, 'Erro ao carregar informações');
    }
  }

  async getGameData(gameName) {
    // Verificar cache primeiro
    if (this.gameDataCache.has(gameName)) {
      return this.gameDataCache.get(gameName);
    }

    try {
      // Simular chamada para API (por enquanto usando dados mock)
      const gameData = await this.mockGameData(gameName);
      
      // Armazenar no cache
      this.gameDataCache.set(gameName, gameData);
      
      return gameData;
    } catch (error) {
      console.error('Erro ao buscar dados do jogo:', error);
      return null;
    }
  }

  async mockGameData(gameName) {
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('🎮 MockGameData recebeu nome:', JSON.stringify(gameName));

    // Dados mock baseados no template fornecido
    const mockData = {
      name: gameName,
      coop: Math.random() > 0.5 ? 'YES' : 'NO',
      online: Math.random() > 0.3 ? `${Math.floor(Math.random() * 8) + 1} players` : 'not available',
      local: Math.random() > 0.6 ? `${Math.floor(Math.random() * 4) + 1} players` : 'not available',
      'online + local': Math.random() > 0.7 ? 'YES' : 'not available',
      metacritic: Math.floor(Math.random() * 40) + 60 // Score entre 60-100
    };

    console.log('🎮 MockGameData retornando:', JSON.stringify(mockData));
    return mockData;
  }

  showLoadingTooltip(event) {
    this.tooltip.innerHTML = `
      <div class="ps-game-info-loading">
        <div class="ps-game-info-spinner"></div>
        <span>Carregando informações...</span>
      </div>
    `;
    this.tooltip.style.display = 'block';
    this.updateTooltipPosition(event);
  }

  showErrorTooltip(event, message) {
    this.tooltip.innerHTML = `
      <div class="ps-game-info-error">
        <span>⚠️ ${message}</span>
      </div>
    `;
    this.tooltip.style.display = 'block';
    this.updateTooltipPosition(event);
  }

  displayGameInfo(gameData, event) {
    console.log('🎮 DisplayGameInfo recebeu dados:', JSON.stringify(gameData));
    console.log('🎮 Nome que será exibido:', JSON.stringify(gameData.name));
    
    this.tooltip.innerHTML = `
      <div class="ps-game-info-content">
        <div class="ps-game-info-header">
          <h3>${gameData.name}</h3>
        </div>
        <div class="ps-game-info-details">
          <div class="ps-game-info-item">
            <span class="ps-game-info-label">Co-op:</span>
            <span class="ps-game-info-value ${gameData.coop === 'YES' ? 'available' : 'not-available'}">${gameData.coop}</span>
          </div>
          <div class="ps-game-info-item">
            <span class="ps-game-info-label">Online:</span>
            <span class="ps-game-info-value ${gameData.online !== 'not available' ? 'available' : 'not-available'}">${gameData.online}</span>
          </div>
          <div class="ps-game-info-item">
            <span class="ps-game-info-label">Local:</span>
            <span class="ps-game-info-value ${gameData.local !== 'not available' ? 'available' : 'not-available'}">${gameData.local}</span>
          </div>
          <div class="ps-game-info-item">
            <span class="ps-game-info-label">Online + Local:</span>
            <span class="ps-game-info-value ${gameData['online + local'] !== 'not available' ? 'available' : 'not-available'}">${gameData['online + local']}</span>
          </div>
          <div class="ps-game-info-item">
            <span class="ps-game-info-label">Metacritic:</span>
            <span class="ps-game-info-value metacritic-score ${this.getMetacriticClass(gameData.metacritic)}">${gameData.metacritic}</span>
          </div>
        </div>
      </div>
    `;
    this.tooltip.style.display = 'block';
    this.updateTooltipPosition(event);
  }

  getMetacriticClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'poor';
  }

  updateTooltipPosition(event) {
    if (!this.tooltip) return;

    const tooltipRect = this.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = event.clientX + 10;
    let top = event.clientY - 10;

    // Ajustar posição se o tooltip sair da tela
    if (left + tooltipRect.width > viewportWidth) {
      left = event.clientX - tooltipRect.width - 10;
    }

    if (top + tooltipRect.height > viewportHeight) {
      top = event.clientY - tooltipRect.height - 10;
    }

    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.display = 'none';
    }
    this.currentGame = null;
  }
}

// Inicializar a extensão quando a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PlayStationGameInfo();
  });
} else {
  new PlayStationGameInfo();
}
