#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { fetchMetacriticData } = require('./fetch-metacritic-scores');

async function testSample() {
  console.log('🧪 Testando com uma amostra de jogos...\n');
  
  try {
    // Ler o arquivo de jogos
    const inputFile = path.join(__dirname, '../output/gamenameListPsn.json');
    const gamesData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    // Pegar apenas os primeiros 5 jogos para teste
    const sampleGames = gamesData.slice(0, 5);
    
    console.log(`📊 Processando amostra de ${sampleGames.length} jogos...\n`);
    
    const results = [];
    
    for (const game of sampleGames) {
      console.log(`\n🔍 Processando: ${game.name}`);
      console.log('─'.repeat(50));
      
      const metacriticData = await fetchMetacriticData(game.name);
      
      if (metacriticData) {
        const result = {
          name: game.name,
          psnGenres: game.genre.join(', '),
          metacriticName: metacriticData.metacriticName,
          metacriticGenres: metacriticData.genres,
          score: metacriticData.score,
          url: metacriticData.url
        };
        
        results.push(result);
        console.log(`✅ Adicionado aos resultados`);
      } else {
        console.log(`❌ Não encontrado no Metacritic`);
      }
      
      // Aguardar 1 segundo entre requisições
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Salvar resultados de teste
    const outputFile = path.join(__dirname, '../output/4playReviewMetacritic-sample.json');
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    
    console.log('\n📊 Resultados do teste:');
    console.log(`✅ Total processado: ${sampleGames.length}`);
    console.log(`🎯 Encontrados: ${results.length}`);
    console.log(`❌ Não encontrados: ${sampleGames.length - results.length}`);
    console.log(`📁 Arquivo salvo: ${outputFile}`);
    
    // Mostrar resultados
    if (results.length > 0) {
      console.log('\n🎮 Resultados encontrados:');
      results.forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.name}`);
        console.log(`     Metacritic: ${result.metacriticName}`);
        console.log(`     Score: ${result.score}`);
        console.log(`     Gêneros PSN: ${result.psnGenres}`);
        console.log(`     Gêneros Metacritic: ${result.metacriticGenres}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

// Executar teste
if (require.main === module) {
  testSample();
}
