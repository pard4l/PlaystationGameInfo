#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { fetchMetacriticData } = require('./fetch-metacritic-scores');

async function runFullScrape() {
  console.log('🚀 Iniciando scraping completo do Metacritic...\n');
  
  try {
    // Ler o arquivo de jogos
    const inputFile = path.join(__dirname, '../output/gamenameListPsn.json');
    const outputFile = path.join(__dirname, '../output/4playReviewMetacritic.json');
    
    if (!fs.existsSync(inputFile)) {
      throw new Error(`Arquivo não encontrado: ${inputFile}`);
    }
    
    const gamesData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    console.log(`📊 Total de jogos para processar: ${gamesData.length}`);
    console.log(`⏱️  Tempo estimado: ${Math.round(gamesData.length * 1.5 / 60)} minutos\n`);
    
    const results = [];
    let processed = 0;
    let found = 0;
    let errors = 0;
    
    // Processar cada jogo
    for (const game of gamesData) {
      processed++;
      const progress = Math.round(processed / gamesData.length * 100);
      
      console.log(`📈 Progresso: ${processed}/${gamesData.length} (${progress}%)`);
      
      try {
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
          found++;
        }
      } catch (error) {
        console.log(`❌ Erro ao processar ${game.name}: ${error.message}`);
        errors++;
      }
      
      // Aguardar entre requisições (1.5 segundos para ser mais conservador)
      if (processed < gamesData.length) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Salvar progresso a cada 50 jogos
      if (processed % 50 === 0) {
        console.log(`💾 Salvando progresso... (${results.length} jogos encontrados)`);
        fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
      }
    }
    
    // Salvar resultados finais
    console.log('\n💾 Salvando resultados finais...');
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    
    // Estatísticas finais
    console.log('\n📊 Estatísticas finais:');
    console.log(`✅ Total processado: ${processed}`);
    console.log(`🎯 Encontrados no Metacritic: ${found}`);
    console.log(`❌ Não encontrados: ${processed - found - errors}`);
    console.log(`⚠️  Erros: ${errors}`);
    console.log(`📁 Arquivo salvo: ${outputFile}`);
    
    // Mostrar alguns exemplos
    if (results.length > 0) {
      console.log('\n🎮 Exemplos de resultados:');
      results.slice(0, 5).forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.name} - Score: ${result.score} - Gêneros: ${result.metacriticGenres}`);
      });
    }
    
    // Estatísticas de scores
    const scores = results.filter(r => r.score !== null).map(r => r.score);
    if (scores.length > 0) {
      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      
      console.log('\n📈 Estatísticas de scores:');
      console.log(`   Média: ${avgScore}`);
      console.log(`   Máximo: ${maxScore}`);
      console.log(`   Mínimo: ${minScore}`);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  runFullScrape();
}
