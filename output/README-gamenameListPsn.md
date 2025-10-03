# 📋 gamenameListPsn.json - Lista de Jogos PlayStation Plus

## 📄 Descrição

Arquivo JSON contendo uma lista simplificada de jogos do PlayStation Plus com:
- **Nome em inglês** (`nameEn` do arquivo original)
- **Gêneros** (`genre` do arquivo original)

## 📊 Estatísticas

- **Total de jogos**: 394
- **Fonte**: `gameslistPsn.json`
- **Formato**: Array de objetos JSON

## 🎮 Estrutura do Arquivo

```json
[
  {
    "name": "Vampyr",
    "genre": [
      "ROLE_PLAYING_GAMES",
      "ACTION"
    ]
  },
  {
    "name": "A Space for the Unbound",
    "genre": [
      "ADVENTURE"
    ]
  }
]
```

## 🔍 Exemplos de Jogos

### **Vampyr**
```json
{
  "name": "Vampyr",
  "genre": [
    "ROLE_PLAYING_GAMES",
    "ACTION"
  ]
}
```

### **Adventure Time: Pirates of the Enchiridion**
```json
{
  "name": "Adventure Time: Pirates of the Enchiridion",
  "genre": [
    "FAMILY",
    "ADVENTURE",
    "ROLE_PLAYING_GAMES"
  ]
}
```

## 🎯 Gêneros Disponíveis

Os gêneros encontrados incluem:
- `ACTION`
- `ADVENTURE`
- `FAMILY`
- `ROLE_PLAYING_GAMES`
- `STRATEGY`
- `SPORTS`
- `RACING`
- `FIGHTING`
- `SHOOTER`
- `PUZZLE`
- `SIMULATION`
- `MUSIC`
- `HORROR`
- `PLATFORMER`

## 🚀 Como Usar

### **JavaScript/Node.js**
```javascript
const games = require('./gamenameListPsn.json');

// Buscar jogo por nome
const vampyr = games.find(game => game.name === 'Vampyr');
console.log(vampyr);

// Filtrar por gênero
const actionGames = games.filter(game => 
  game.genre.includes('ACTION')
);
```

### **Python**
```python
import json

with open('gamenameListPsn.json', 'r') as f:
    games = json.load(f)

# Buscar jogo por nome
vampyr = next((game for game in games if game['name'] == 'Vampyr'), None)
print(vampyr)

# Filtrar por gênero
action_games = [game for game in games if 'ACTION' in game['genre']]
```

## 📝 Notas

- **Nomes**: Todos os nomes estão em inglês (`nameEn`)
- **Gêneros**: Array de strings com gêneros do jogo
- **Ordem**: Jogos estão organizados alfabeticamente por categoria (A, B, C, etc.)
- **Atualização**: Arquivo gerado automaticamente a partir de `gameslistPsn.json`

## 🔄 Regeneração

Para regenerar este arquivo:
1. Atualize o arquivo `gameslistPsn.json`
2. Execute o script de extração
3. O arquivo `gamenameListPsn.json` será atualizado

---

**Arquivo criado automaticamente em: $(date)**
