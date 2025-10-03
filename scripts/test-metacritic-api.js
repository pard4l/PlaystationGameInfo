#!/usr/bin/env node

const { fetchMetacriticData } = require('./fetch-metacritic-scores');

async function testAPI() {
  console.log('🧪 Testando API do Metacritic...\n');
  
  // Jogos de teste
  const testGames = [
    'Vampyr',
    'A Space for the Unbound',
    'The Last of Us Part II',
    'God of War',
    'Spider-Man'
  ];
  
  for (const gameName of testGames) {
    console.log(`\n🔍 Testando: ${gameName}`);
    console.log('─'.repeat(50));
    
    try {
      const result = await fetchMetacriticData(gameName);
      
      if (result) {
        console.log(`✅ Sucesso!`);
        console.log(`   Nome no Metacritic: ${result.metacriticName}`);
        console.log(`   Score: ${result.score}`);
        console.log(`   Gêneros: ${result.genres}`);
        console.log(`   URL: ${result.url}`);
      } else {
        console.log(`❌ Nenhum resultado encontrado`);
      }
    } catch (error) {
      console.log(`❌ Erro: ${error.message}`);
    }
    
    // Aguardar 2 segundos entre testes
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n🏁 Teste concluído!');
}

// Executar teste
if (require.main === module) {
  testAPI();
}
