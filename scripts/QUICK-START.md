# 🚀 Quick Start - Metacritic Scraper

## ⚡ Execução Rápida

### **1. Teste Rápido (5 jogos)**
```bash
cd scripts
node test-sample.js
```

### **2. Scraping Completo (394 jogos)**
```bash
cd scripts
node run-full-scrape.js
```

## 📊 Resultados

- **Arquivo gerado**: `../output/4playReviewMetacritic.json`
- **Tempo estimado**: ~10 minutos para todos os jogos
- **Rate limiting**: 1.5 segundos entre requisições

## 🎮 Exemplo de Saída

```json
{
  "name": "Vampyr",
  "psnGenres": "ROLE_PLAYING_GAMES, ACTION",
  "metacriticName": "Vampyr",
  "metacriticGenres": "Action RPG",
  "score": 70,
  "url": "/game/vampyr/critic-reviews/"
}
```

## ⚠️ Importante

- **Teste primeiro** com `test-sample.js`
- **Verifique** se o arquivo `gamenameListPsn.json` existe
- **Aguarde** o processamento completo
- **Backup** dos resultados importantes

---

**Pronto para usar! 🎮✨**
