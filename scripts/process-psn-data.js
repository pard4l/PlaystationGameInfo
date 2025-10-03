const fs = require('fs');
const path = require('path');

// Função para normalizar nomes de jogos para comparação
function normalizeGameName(name) {
    return name
        .toLowerCase()
        .replace(/[™®©]/g, '') // Remove símbolos de marca registrada
        .replace(/[^\w\s]/g, ' ') // Remove caracteres especiais
        .replace(/\s+/g, ' ') // Normaliza espaços
        .trim();
}

// Função para extrair número de jogadores de uma string
function extractPlayerCount(str) {
    if (!str || str === 'Not available') return null;
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
}

// Função para verificar se há coop baseado nas informações
function hasCoopInfo(info1, info2, info3, info4) {
    const coopKeywords = ['co-op', 'coop', 'cooperative', 'drop-in', 'drop-out', 'split-screen'];
    const allInfo = [info1, info2, info3, info4].join(' ').toLowerCase();
    return coopKeywords.some(keyword => allInfo.includes(keyword));
}

// Função para verificar se há split-screen
function hasSplitScreen(info1, info2, info3, info4) {
    const allInfo = [info1, info2, info3, info4].join(' ').toLowerCase();
    return allInfo.includes('split-screen');
}

// Função para verificar se há drop-in/drop-out
function hasDropInDropOut(info1, info2, info3, info4) {
    const allInfo = [info1, info2, info3, info4].join(' ').toLowerCase();
    return allInfo.includes('drop-in') && allInfo.includes('drop-out');
}

// Função para processar dados do CSV
function processCsvData(csvPath) {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    const csvData = {};
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',');
        if (values.length < headers.length) continue;
        
        const titulo = values[0];
        const genero = values[1];
        const online = values[2];
        const local = values[3];
        const combo = values[4];
        const info1 = values[5] || '';
        const info2 = values[6] || '';
        const info3 = values[7] || '';
        const info4 = values[8] || '';
        
        const normalizedName = normalizeGameName(titulo);
        csvData[normalizedName] = {
            titulo,
            genero,
            online,
            local,
            combo,
            info1,
            info2,
            info3,
            info4
        };
    }
    
    return csvData;
}

// Função principal
function processGameData() {
    try {
        // Caminhos dos arquivos
        const jsonPath = path.join(__dirname, '../output/4playReviewMetacritic.json');
        const csvPath = path.join(__dirname, '../output/PS Games - CSV.csv');
        const outputPath = path.join(__dirname, '../output/4playReviewPsn.json');
        
        // Verificar se os arquivos existem
        if (!fs.existsSync(jsonPath)) {
            throw new Error(`Arquivo JSON não encontrado: ${jsonPath}`);
        }
        if (!fs.existsSync(csvPath)) {
            throw new Error(`Arquivo CSV não encontrado: ${csvPath}`);
        }
        
        console.log('Carregando dados do JSON...');
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        
        console.log('Processando dados do CSV...');
        const csvData = processCsvData(csvPath);
        
        console.log(`Encontrados ${Object.keys(csvData).length} jogos no CSV`);
        
        // Processar cada jogo do JSON
        const processedData = jsonData.map(game => {
            const normalizedName = normalizeGameName(game.name);
            const csvMatch = csvData[normalizedName];
            
            if (csvMatch) {
                console.log(`✓ Encontrado: ${game.name} -> ${csvMatch.titulo}`);
                
                // Extrair números de jogadores
                const onlineCount = extractPlayerCount(csvMatch.online);
                const localCount = extractPlayerCount(csvMatch.local);
                const comboCount = extractPlayerCount(csvMatch.combo);
                
                // Determinar informações de coop
                const hasCoop = hasCoopInfo(csvMatch.info1, csvMatch.info2, csvMatch.info3, csvMatch.info4);
                const hasSplit = hasSplitScreen(csvMatch.info1, csvMatch.info2, csvMatch.info3, csvMatch.info4);
                const hasDropInOut = hasDropInDropOut(csvMatch.info1, csvMatch.info2, csvMatch.info3, csvMatch.info4);
                
                // Adicionar informações do PSN
                return {
                    ...game,
                    psnInfo: {
                        titulo: csvMatch.titulo,
                        genero: csvMatch.genero,
                        online: onlineCount ? `${onlineCount}` : 'No disponible',
                        local: localCount ? `${localCount}` : 'No disponible',
                        'local+online': comboCount ? `${comboCount}` : 'No disponible',
                        coop: (onlineCount > 0 || localCount > 0 || comboCount > 0 || hasCoop) ? 'YES' : 'No',
                        'split-screen': hasSplit ? 'YES' : 'NO',
                        'supports drop-in/drop-out co-op': hasDropInOut ? 'YES' : 'NO',
                        info1: csvMatch.info1,
                        info2: csvMatch.info2,
                        info3: csvMatch.info3,
                        info4: csvMatch.info4
                    }
                };
            } else {
                console.log(`✗ Não encontrado: ${game.name}`);
                
                // Adicionar informações vazias para jogos não encontrados
                return {
                    ...game,
                    psnInfo: {
                        titulo: game.name,
                        genero: 'Not found',
                        online: 'No disponible',
                        local: 'No disponible',
                        'local+online': 'No disponible',
                        coop: 'No',
                        'split-screen': 'NO',
                        'supports drop-in/drop-out co-op': 'NO',
                        info1: '',
                        info2: '',
                        info3: '',
                        info4: ''
                    }
                };
            }
        });
        
        // Salvar resultado
        console.log('Salvando dados processados...');
        fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2), 'utf-8');
        
        // Estatísticas
        const found = processedData.filter(game => game.psnInfo.genero !== 'Not found').length;
        const notFound = processedData.length - found;
        
        console.log('\n=== ESTATÍSTICAS ===');
        console.log(`Total de jogos processados: ${processedData.length}`);
        console.log(`Jogos encontrados no CSV: ${found}`);
        console.log(`Jogos não encontrados: ${notFound}`);
        console.log(`Taxa de sucesso: ${((found / processedData.length) * 100).toFixed(2)}%`);
        console.log(`\nArquivo salvo em: ${outputPath}`);
        
    } catch (error) {
        console.error('Erro ao processar dados:', error.message);
        process.exit(1);
    }
}

// Executar o script
if (require.main === module) {
    processGameData();
}

module.exports = { processGameData, normalizeGameName, extractPlayerCount };
