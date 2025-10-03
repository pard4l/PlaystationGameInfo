// Script de teste específico para verificar elementos card_name
// Cole este código no console do navegador na página do PlayStation Plus

console.log('🔍 === TESTE ESPECÍFICO CARD_NAME ===');

// Teste 1: Verificar se elementos card_name existem
const cardNameElements = document.querySelectorAll('.card_name__mLuPs, div[class*="card_name"]');
console.log('✅ Elementos card_name encontrados:', cardNameElements.length);

// Teste 2: Verificar elementos card_name com parágrafo
const cardNameWithP = document.querySelectorAll('.card_name__mLuPs p, div[class*="card_name"] p');
console.log('✅ Elementos card_name com <p> encontrados:', cardNameWithP.length);

// Teste 3: Mostrar exemplos de card_name
if (cardNameElements.length > 0) {
  console.log('📋 Exemplos de card_name encontrados:');
  Array.from(cardNameElements).slice(0, 5).forEach((element, index) => {
    const text = element.textContent?.trim() || 'sem texto';
    const hasP = element.querySelector('p') ? 'SIM' : 'NÃO';
    console.log(`  ${index + 1}. ${element.className} - "${text}" - Tem <p>: ${hasP}`);
  });
}

// Teste 4: Verificar links dentro de card-grid
const gameLinks = document.querySelectorAll('div[class*="card-grid"] a');
console.log('✅ Links dentro de card-grid encontrados:', gameLinks.length);

// Teste 5: Verificar se links têm card_name como pai
let linksWithCardName = 0;
gameLinks.forEach(link => {
  const cardNameParent = link.closest('div[class*="card_name"], .card_name__mLuPs');
  if (cardNameParent) {
    linksWithCardName++;
  }
});
console.log('✅ Links com card_name como pai:', linksWithCardName);

// Teste 6: Verificar estrutura específica
if (gameLinks.length > 0) {
  console.log('📋 Estrutura do primeiro link:');
  const firstLink = Array.from(gameLinks)[0];
  console.log('  Link:', firstLink.tagName, firstLink.className);
  console.log('  Href:', firstLink.href);
  
  // Verificar se tem card_name como filho
  const cardNameChild = firstLink.querySelector('.card_name__mLuPs, div[class*="card_name"]');
  if (cardNameChild) {
    console.log('  ✅ Tem card_name como filho:', cardNameChild.className);
    const pElement = cardNameChild.querySelector('p');
    if (pElement) {
      console.log('  ✅ Tem <p> dentro do card_name:', pElement.textContent?.trim());
    }
  } else {
    console.log('  ❌ NÃO tem card_name como filho');
  }
  
  // Verificar se tem card_name como pai
  const cardNameParent = firstLink.closest('div[class*="card_name"], .card_name__mLuPs');
  if (cardNameParent) {
    console.log('  ✅ Tem card_name como pai:', cardNameParent.className);
    const pElement = cardNameParent.querySelector('p');
    if (pElement) {
      console.log('  ✅ Tem <p> dentro do card_name do pai:', pElement.textContent?.trim());
    }
  } else {
    console.log('  ❌ NÃO tem card_name como pai');
  }
}

// Teste 7: Verificar se a extensão está funcionando
const tooltip = document.querySelector('#ps-game-info-tooltip');
console.log('✅ Tooltip da extensão existe:', tooltip ? 'SIM' : 'NÃO');

console.log('🔍 === FIM DO TESTE CARD_NAME ===');
