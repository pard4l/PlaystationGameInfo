// PlayStation Game Info Extension - Background Script

// Listener para quando a extensão é instalada
chrome.runtime.onInstalled.addListener((details) => {
  console.log('PlayStation Game Info extension installed:', details.reason);
  
  // Configurações padrão
  chrome.storage.sync.set({
    enabled: true,
    showMetacritic: true,
    showCoopInfo: true,
    apiEndpoint: 'https://api.example.com/games' // Será configurado no futuro
  });
});

// Listener para mensagens do content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getGameData') {
    handleGameDataRequest(request.gameName, sendResponse);
    return true; // Indica que a resposta será assíncrona
  }
});

// Função para lidar com requisições de dados de jogos
async function handleGameDataRequest(gameName, sendResponse) {
  try {
    // Por enquanto, usar dados mock
    // No futuro, aqui será feita a chamada para a API real
    const gameData = await getMockGameData(gameName);
    sendResponse({ success: true, data: gameData });
  } catch (error) {
    console.error('Erro ao buscar dados do jogo:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Função mock para dados de jogos (será substituída por API real)
async function getMockGameData(gameName) {
  // Simular delay da API
  await new Promise(resolve => setTimeout(resolve, 300));

  // Dados mock baseados no template fornecido
  const mockData = {
    name: gameName,
    coop: Math.random() > 0.5 ? 'YES' : 'NO',
    online: Math.random() > 0.3 ? `${Math.floor(Math.random() * 8) + 1} players` : 'not available',
    local: Math.random() > 0.6 ? `${Math.floor(Math.random() * 4) + 1} players` : 'not available',
    'online + local': Math.random() > 0.7 ? 'YES' : 'not available',
    metacritic: Math.floor(Math.random() * 40) + 60 // Score entre 60-100
  };

  return mockData;
}

// Listener para mudanças nas abas
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('playstation.com')) {
    // Pode adicionar lógica adicional aqui se necessário
    console.log('PlayStation page loaded:', tab.url);
  }
});

// Função para limpar cache quando necessário
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.apiEndpoint) {
    console.log('API endpoint changed:', changes.apiEndpoint.newValue);
    // Aqui pode limpar cache se necessário
  }
});
