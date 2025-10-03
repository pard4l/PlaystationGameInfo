#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configurações
const INPUT_FILE = path.join(__dirname, '../output/gamenameListPsn.json');
const OUTPUT_FILE = path.join(__dirname, '../output/4playReviewMetacritic.json');
const API_BASE_URL = 'https://backend.metacritic.com/finder/metacritic/autosuggest/';
const DELAY_BETWEEN_REQUESTS = 1000; // 1 segundo entre requisições

// Função para fazer requisição HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`Erro ao parsear JSON: ${error.message}`));
        }
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Timeout na requisição'));
    });
  });
}

// Função para buscar dados do Metacritic
async function fetchMetacriticData(gameName) {
  try {
    // Codificar o nome do jogo para URL
    const encodedGameName = encodeURIComponent(gameName);
    const url = `${API_BASE_URL}${encodedGameName}`;
    
    console.log(`🔍 Buscando: ${gameName}`);
    
    const data = await makeRequest(url);
    
    // Procurar por resultados do tipo "game-title" na estrutura correta
    const gameResults = data.data?.items?.filter(item => item.type === 'game-title') || [];
    
    if (gameResults.length === 0) {
      console.log(`❌ Nenhum resultado encontrado para: ${gameName}`);
      return null;
    }
    
    // Pegar o primeiro resultado (mais relevante)
    const gameResult = gameResults[0];
    
    // Extrair gêneros
    const genres = gameResult.genres?.map(genre => genre.name).join(', ') || 'N/A';
    
    // Extrair score
    const score = gameResult.criticScoreSummary?.score || null;
    
    const result = {
      name: gameName,
      metacriticName: gameResult.title,
      genres: genres,
      score: score,
      url: gameResult.criticScoreSummary?.url || null
    };
    
    console.log(`✅ Encontrado: ${gameResult.title} - Score: ${score} - Gêneros: ${genres}`);
    
    return result;
    
  } catch (error) {
    console.log(`❌ Erro ao buscar ${gameName}: ${error.message}`);
    return null;
  }
}

// Função para aguardar um tempo
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Função principal
async function main() {
  try {
    console.log('🚀 Iniciando busca de scores do Metacritic...');
    
    // Verificar se o arquivo de entrada existe
    if (!fs.existsSync(INPUT_FILE)) {
      throw new Error(`Arquivo não encontrado: ${INPUT_FILE}`);
    }
    
    // Ler o arquivo de jogos
    console.log('📖 Lendo arquivo de jogos...');
    const gamesData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
    
    console.log(`📊 Total de jogos para processar: ${gamesData.length}`);
    
    const results = [];
    let processed = 0;
    let found = 0;
    
    // Processar cada jogo
    for (const game of gamesData) {
      processed++;
      console.log(`\n📈 Progresso: ${processed}/${gamesData.length} (${Math.round(processed/gamesData.length*100)}%)`);
      
      const metacriticData = await fetchMetacriticData(game.name);
      
      if (metacriticData) {
        // Adicionar gênero original do PlayStation Plus
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
      
      // Aguardar entre requisições para não sobrecarregar a API
      if (processed < gamesData.length) {
        await sleep(DELAY_BETWEEN_REQUESTS);
      }
    }
    
    // Salvar resultados
    console.log('\n💾 Salvando resultados...');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    
    // Estatísticas finais
    console.log('\n📊 Estatísticas finais:');
    console.log(`✅ Total processado: ${processed}`);
    console.log(`🎯 Encontrados no Metacritic: ${found}`);
    console.log(`❌ Não encontrados: ${processed - found}`);
    console.log(`📁 Arquivo salvo: ${OUTPUT_FILE}`);
    
    // Mostrar alguns exemplos
    if (results.length > 0) {
      console.log('\n🎮 Exemplos de resultados:');
      results.slice(0, 5).forEach((result, index) => {
        console.log(`  ${index + 1}. ${result.name} - Score: ${result.score} - Gêneros: ${result.metacriticGenres}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar se for chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { fetchMetacriticData, makeRequest };
