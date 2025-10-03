// Script de teste simples e robusto
// Cole este código no console do navegador na página do PlayStation Plus

console.log('🔍 === TESTE SIMPLES CARD_NAME ===');

try {
  // Teste 1: Verificar elementos card_name
  const cardNameElements = document.querySelectorAll('.card_name__mLuPs, div[class*="card_name"]');
  console.log('✅ Elementos card_name encontrados:', cardNameElements.length);
  
  // Teste 2: Verificar elementos card_name com parágrafo
  const cardNameWithP = document.querySelectorAll('.card_name__mLuPs p, div[class*="card_name"] p');
  console.log('✅ Elementos card_name com <p> encontrados:', cardNameWithP.length);
  
  // Teste 3: Verificar links dentro de card-grid
  const gameLinks = document.querySelectorAll('div[class*="card-grid"] a');
  console.log('✅ Links dentro de card-grid encontrados:', gameLinks.length);
  
  // Teste 4: Mostrar exemplos (máximo 3)
  if (cardNameElements.length > 0) {
    console.log('📋 Exemplos de card_name:');
    for (let i = 0; i < Math.min(3, cardNameElements.length); i++) {
      const element = cardNameElements[i];
      const text = element.textContent?.trim() || 'sem texto';
      const hasP = element.querySelector('p') ? 'SIM' : 'NÃO';
      console.log(`  ${i + 1}. ${element.className} - "${text}" - Tem <p>: ${hasP}`);
    }
  }
  
  // Teste 5: Verificar primeiro link
  if (gameLinks.length > 0) {
    console.log('📋 Primeiro link encontrado:');
    const firstLink = gameLinks[0];
    console.log('  Tag:', firstLink.tagName);
    console.log('  Classes:', firstLink.className);
    console.log('  Href:', firstLink.href);
    
    // Verificar se tem card_name como filho
    const cardNameChild = firstLink.querySelector('.card_name__mLuPs, div[class*="card_name"]');
    if (cardNameChild) {
      console.log('  ✅ Tem card_name como filho');
      const pElement = cardNameChild.querySelector('p');
      if (pElement) {
        console.log('  ✅ Texto do <p>:', pElement.textContent?.trim());
      }
    } else {
      console.log('  ❌ NÃO tem card_name como filho');
    }
  }
  
  // Teste 6: Verificar tooltip da extensão
  const tooltip = document.querySelector('#ps-game-info-tooltip');
  console.log('✅ Tooltip da extensão existe:', tooltip ? 'SIM' : 'NÃO');
  
  console.log('🔍 === TESTE CONCLUÍDO ===');
  
} catch (error) {
  console.error('❌ Erro no teste:', error);
}
