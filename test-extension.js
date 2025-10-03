// Script de teste para verificar se a extensão está funcionando
// Cole este código no console do navegador na página do PlayStation Plus

console.log('🔍 === TESTE DA EXTENSÃO PLAYSTATION GAME INFO ===');

// Teste 1: Verificar se o tooltip foi criado
const tooltip = document.querySelector('#ps-game-info-tooltip');
console.log('✅ Tooltip criado:', tooltip ? 'SIM' : 'NÃO');

// Teste 2: Verificar elementos de jogos
const gameLinks = document.querySelectorAll('div[class*="card-grid"] a');
console.log('✅ Links de jogos encontrados:', gameLinks.length);

// Teste 3: Verificar elementos card_name
const cardNames = document.querySelectorAll('.card_name__mLuPs, div[class*="card_name"]');
console.log('✅ Elementos card_name encontrados:', cardNames.length);

// Teste 4: Verificar se elementos têm listeners
let elementsWithListeners = 0;
gameLinks.forEach(link => {
  if (link.hasAttribute('data-ps-game-info')) {
    elementsWithListeners++;
  }
});
console.log('✅ Elementos com listeners:', elementsWithListeners);

// Teste 5: Mostrar alguns exemplos
if (gameLinks.length > 0) {
  console.log('📋 Exemplos de links encontrados:');
  gameLinks.slice(0, 3).forEach((link, index) => {
    console.log(`  ${index + 1}. ${link.tagName} - ${link.className} - ${link.href || 'sem href'}`);
  });
}

if (cardNames.length > 0) {
  console.log('📋 Exemplos de card_name encontrados:');
  cardNames.slice(0, 3).forEach((card, index) => {
    const text = card.textContent?.trim() || 'sem texto';
    console.log(`  ${index + 1}. ${card.className} - "${text}"`);
  });
}

// Teste 6: Verificar se a extensão está ativa
const extensionActive = tooltip && gameLinks.length > 0;
console.log('🎮 Extensão funcionando:', extensionActive ? 'SIM' : 'NÃO');

if (!extensionActive) {
  console.log('❌ PROBLEMAS ENCONTRADOS:');
  if (!tooltip) console.log('  - Tooltip não foi criado');
  if (gameLinks.length === 0) console.log('  - Nenhum link de jogo encontrado');
  if (cardNames.length === 0) console.log('  - Nenhum elemento card_name encontrado');
}

console.log('🔍 === FIM DO TESTE ===');
