# 🔍 Debug dos Console Logs - PlayStation Game Info

## ❓ Por que os Console Logs Não Aparecem?

### 1. **Verificar se a Extensão Está Ativa**

#### ✅ **Passo 1: Verificar Extensão**
1. Vá para `chrome://extensions/`
2. Verifique se a extensão está **ATIVADA** (toggle azul)
3. Se estiver desativada, clique para ativar

#### ✅ **Passo 2: Recarregar Extensão**
1. Na página `chrome://extensions/`
2. Clique no botão **"Recarregar"** da extensão
3. Ou clique no ícone de atualização

### 2. **Verificar Console Correto**

#### ✅ **Console da Página (Content Script)**
- **Como abrir**: Pressione `F12` na página do PlayStation Plus
- **Onde**: Aba "Console"
- **O que deve aparecer**: Logs do content script

#### ✅ **Console do Popup**
- **Como abrir**: 
  1. Clique no ícone da extensão
  2. Botão direito no popup → "Inspecionar"
- **Onde**: Aba "Console"
- **O que deve aparecer**: Logs do popup

#### ✅ **Console do Background Script**
- **Como abrir**: 
  1. Vá para `chrome://extensions/`
  2. Clique em "Detalhes" da extensão
  3. Clique em "Inspecionar visualizações: background page"
- **Onde**: Aba "Console"
- **O que deve aparecer**: Logs do background script

### 3. **Verificar Filtros do Console**

#### ✅ **Limpar Filtros**
1. No console, clique no ícone de filtro (🔍)
2. Certifique-se que **"All levels"** está selecionado
3. Verifique se não há filtros de texto ativos
4. Clique em "Clear console" (🗑️) para limpar

#### ✅ **Verificar Níveis de Log**
- Certifique-se que **Info**, **Warn** e **Error** estão habilitados
- Os logs da extensão usam `console.log()` (nível Info)

### 4. **Verificar Página Correta**

#### ✅ **URL Correta**
- Deve estar em: `https://www.playstation.com/pt-br/ps-plus/games/`
- Ou qualquer URL que termine com `/ps-plus/games/`

#### ✅ **Recarregar Página**
- Pressione `F5` ou `Ctrl+R` para recarregar
- Os logs aparecem quando a página carrega

### 5. **Testar Manualmente**

#### ✅ **Teste 1: Log Simples**
Abra o console e digite:
```javascript
console.log('🎮 Teste manual - Console funcionando!');
```

#### ✅ **Teste 2: Verificar Extensão**
No console da página, digite:
```javascript
console.log('Extensão carregada:', document.querySelector('#ps-game-info-tooltip'));
```

### 6. **Logs Esperados**

#### ✅ **Quando a Página Carrega:**
```
🎮 PlayStation Game Info extension loaded
📍 Página atual: https://www.playstation.com/pt-br/ps-plus/games/
🎯 Encontrados X elementos com seletor: div[class*="card-grid"] a
🔗 Link 1: A [classes] [href]
```

#### ✅ **Quando Passar Mouse sobre Jogo:**
```
🔗 Link dentro de card-grid detectado: [elemento]
🎮 Nome do jogo detectado: [Nome do Jogo]
✅ Nome extraído: [Nome] | Método: elemento filho (.card_name__mLuPs p)
🎮 Nome do jogo encontrado no card_name: [Nome]
```

### 7. **Solução de Problemas**

#### ❌ **Problema: Console vazio**
**Soluções:**
1. Recarregar a extensão
2. Recarregar a página
3. Verificar se está na URL correta
4. Verificar se a extensão está ativa

#### ❌ **Problema: Só aparecem erros**
**Soluções:**
1. Verificar filtros do console
2. Habilitar todos os níveis de log
3. Limpar console e recarregar

#### ❌ **Problema: Logs aparecem mas tooltip não funciona**
**Soluções:**
1. Verificar se elementos são detectados
2. Verificar se nome do jogo é extraído
3. Verificar se tooltip é criado

### 8. **Verificação Rápida**

#### ✅ **Checklist:**
- [ ] Extensão ativada em `chrome://extensions/`
- [ ] Extensão recarregada
- [ ] Página recarregada (F5)
- [ ] Console aberto (F12)
- [ ] Filtros do console limpos
- [ ] URL correta do PlayStation Plus
- [ ] Mouse passado sobre jogos

### 9. **Comandos de Debug**

#### ✅ **No Console da Página:**
```javascript
// Verificar se extensão está carregada
console.log('Tooltip existe:', document.querySelector('#ps-game-info-tooltip'));

// Verificar elementos de jogos
console.log('Links encontrados:', document.querySelectorAll('div[class*="card-grid"] a').length);

// Verificar elementos card_name
console.log('Card names encontrados:', document.querySelectorAll('.card_name__mLuPs').length);
```

### 10. **Se Nada Funcionar**

#### ✅ **Reinstalar Extensão:**
1. Remover extensão de `chrome://extensions/`
2. Recarregar página
3. Reinstalar extensão
4. Testar novamente

---

**Console logs devem aparecer! 🔍✨**
