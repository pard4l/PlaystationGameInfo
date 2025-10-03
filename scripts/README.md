# 🎮 Script Metacritic Scraper - PlayStation Game Info

## 📄 Descrição

Script Node.js para buscar scores do Metacritic para todos os jogos do PlayStation Plus listados no arquivo `gamenameListPsn.json`.

## 🚀 Funcionalidades

- ✅ Consulta a API do Metacritic para cada jogo
- ✅ Filtra apenas resultados do tipo "game-title"
- ✅ Extrai score e gêneros do Metacritic
- ✅ Combina com dados originais do PlayStation Plus
- ✅ Gera arquivo `4playReviewMetacritic.json`
- ✅ Rate limiting para não sobrecarregar a API
- ✅ Logs detalhados de progresso

## 📋 Pré-requisitos

- Node.js 14.0.0 ou superior
- Arquivo `gamenameListPsn.json` na pasta `../output/`

## 🛠️ Instalação

```bash
# Navegar para a pasta scripts
cd scripts

# Instalar dependências (se necessário)
npm install
```

## 📁 Scripts Disponíveis

- **`test-metacritic-api.js`** - Testa a API com jogos específicos
- **`test-sample.js`** - Processa apenas 5 jogos para teste
- **`run-full-scrape.js`** - Script otimizado para processar todos os jogos
- **`fetch-metacritic-scores.js`** - Script original completo

## 🎯 Como Usar

### **1. Teste da API**
```bash
node test-metacritic-api.js
```

### **2. Teste com Amostra (Recomendado)**
```bash
node test-sample.js
```

### **3. Executar Scraping Completo**
```bash
node run-full-scrape.js
```

### **4. Script Original**
```bash
node fetch-metacritic-scores.js
```

### **5. Usando npm**
```bash
npm start
```

## 📊 Estrutura de Saída

O arquivo `4playReviewMetacritic.json` será criado com a seguinte estrutura:

```json
[
  {
    "name": "Vampyr",
    "psnGenres": "ROLE_PLAYING_GAMES, ACTION",
    "metacriticName": "Vampyr",
    "metacriticGenres": "Third-Person Adventure, RPG",
    "score": 77,
    "url": "/game/vampyr/critic-reviews/"
  }
]
```

## 🔧 Configurações

### **Rate Limiting**
- **Delay entre requisições**: 1 segundo (1000ms)
- **Timeout por requisição**: 10 segundos

### **Arquivos**
- **Entrada**: `../output/gamenameListPsn.json`
- **Saída**: `../output/4playReviewMetacritic.json`

## 📈 Progresso e Logs

O script mostra:
- ✅ Progresso em tempo real
- ✅ Jogos encontrados vs não encontrados
- ✅ Scores e gêneros extraídos
- ✅ Estatísticas finais
- ✅ Exemplos de resultados

## 🎮 Exemplo de Execução

```
🚀 Iniciando busca de scores do Metacritic...
📖 Lendo arquivo de jogos...
📊 Total de jogos para processar: 394

📈 Progresso: 1/394 (0%)
🔍 Buscando: A Space for the Unbound
✅ Encontrado: A Space for the Unbound - Score: 85 - Gêneros: Adventure

📈 Progresso: 2/394 (1%)
🔍 Buscando: Abiotic Factor
❌ Nenhum resultado encontrado para: Abiotic Factor

💾 Salvando resultados...

📊 Estatísticas finais:
✅ Total processado: 394
🎯 Encontrados no Metacritic: 287
❌ Não encontrados: 107
📁 Arquivo salvo: ../output/4playReviewMetacritic.json
```

## 🔍 Campos Extraídos

### **Do PlayStation Plus:**
- `name`: Nome original do jogo
- `psnGenres`: Gêneros do PlayStation Plus

### **Do Metacritic:**
- `metacriticName`: Nome no Metacritic
- `metacriticGenres`: Gêneros do Metacritic (separados por vírgula)
- `score`: Score do Metacritic
- `url`: URL das reviews

## ⚠️ Limitações

- **Rate Limiting**: 1 requisição por segundo
- **Timeout**: 10 segundos por requisição
- **Filtros**: Apenas resultados "game-title"
- **API**: Dependente da disponibilidade da API do Metacritic

## 🐛 Solução de Problemas

### **Erro de Timeout**
- A API pode estar lenta
- Aumentar o timeout no código

### **Muitos "Não encontrados"**
- Nomes podem não corresponder exatamente
- API pode ter jogos com nomes diferentes

### **Erro de Rate Limiting**
- Aumentar o delay entre requisições
- Verificar se a API tem limites

## 📝 Notas

- O script processa todos os 394 jogos do arquivo
- Pode levar cerca de 6-7 minutos para completar
- Resultados são salvos automaticamente
- Logs detalhados para acompanhar o progresso

---

**Script criado para PlayStation Game Info Extension 🎮✨**
