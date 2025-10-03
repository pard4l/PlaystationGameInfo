// PlayStation Game Info Extension - Popup Script

document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('🎮 Popup carregado');
    
    // Carregar configurações salvas
    await loadSettings();
    
    // Configurar event listeners
    setupEventListeners();
    
    console.log('✅ Popup configurado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao carregar popup:', error);
  }
});

async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get([
      'enabled',
      'showMetacritic',
      'showCoopInfo'
    ]);

    // Aplicar configurações aos toggles com verificação de segurança
    const toggleEnabled = document.getElementById('toggleEnabled');
    const toggleMetacritic = document.getElementById('toggleMetacritic');
    const toggleCoop = document.getElementById('toggleCoop');

    if (toggleEnabled) {
      toggleEnabled.classList.toggle('active', result.enabled !== false);
    }
    if (toggleMetacritic) {
      toggleMetacritic.classList.toggle('active', result.showMetacritic !== false);
    }
    if (toggleCoop) {
      toggleCoop.classList.toggle('active', result.showCoopInfo !== false);
    }

    console.log('⚙️ Configurações carregadas:', result);
  } catch (error) {
    console.error('❌ Erro ao carregar configurações:', error);
  }
}

function setupEventListeners() {
  try {
    // Toggle para habilitar/desabilitar extensão
    const toggleEnabled = document.getElementById('toggleEnabled');
    if (toggleEnabled) {
      toggleEnabled.addEventListener('click', async (e) => {
        const toggle = e.target;
        const isActive = toggle.classList.contains('active');
        
        toggle.classList.toggle('active', !isActive);
        
        try {
          await chrome.storage.sync.set({ enabled: !isActive });
          
          // Notificar content script sobre mudança
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab && tab.url.includes('playstation.com')) {
            chrome.tabs.sendMessage(tab.id, {
              action: 'toggleExtension',
              enabled: !isActive
            });
          }
          console.log('✅ Extensão', !isActive ? 'habilitada' : 'desabilitada');
        } catch (error) {
          console.error('❌ Erro ao salvar configuração:', error);
          // Reverter toggle em caso de erro
          toggle.classList.toggle('active', isActive);
        }
      });
    }

    // Toggle para mostrar/ocultar Metacritic
    const toggleMetacritic = document.getElementById('toggleMetacritic');
    if (toggleMetacritic) {
      toggleMetacritic.addEventListener('click', async (e) => {
        const toggle = e.target;
        const isActive = toggle.classList.contains('active');
        
        toggle.classList.toggle('active', !isActive);
        
        try {
          await chrome.storage.sync.set({ showMetacritic: !isActive });
          console.log('✅ Metacritic', !isActive ? 'habilitado' : 'desabilitado');
        } catch (error) {
          console.error('❌ Erro ao salvar configuração:', error);
          toggle.classList.toggle('active', isActive);
        }
      });
    }

    // Toggle para mostrar/ocultar informações de Co-op
    const toggleCoop = document.getElementById('toggleCoop');
    if (toggleCoop) {
      toggleCoop.addEventListener('click', async (e) => {
        const toggle = e.target;
        const isActive = toggle.classList.contains('active');
        
        toggle.classList.toggle('active', !isActive);
        
        try {
          await chrome.storage.sync.set({ showCoopInfo: !isActive });
          console.log('✅ Co-op', !isActive ? 'habilitado' : 'desabilitado');
        } catch (error) {
          console.error('❌ Erro ao salvar configuração:', error);
          toggle.classList.toggle('active', isActive);
        }
      });
    }

    console.log('✅ Event listeners configurados');
  } catch (error) {
    console.error('❌ Erro ao configurar event listeners:', error);
  }
}
