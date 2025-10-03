# 🔧 Passo a Passo - Debug dos Console Logs

## 🚀 **PASSO 1: Verificar Extensão**

### ✅ **1.1 - Abrir Extensões**
1. Digite na barra de endereço: `chrome://extensions/`
2. Pressione Enter

### ✅ **1.2 - Verificar Status**
- Procure por "PlayStation Game Info"
- Verifique se o **toggle está AZUL** (ativado)
- Se estiver cinza, clique para ativar

### ✅ **1.3 - Recarregar Extensão**
- Clique no botão **"Recarregar"** (ícone de atualização)
- Ou remova e adicione novamente

---

## 🚀 **PASSO 2: Abrir Console**

### ✅ **2.1 - Navegar para PlayStation Plus**
1. Vá para: `https://www.playstation.com/pt-br/ps-plus/games/`
2. Aguarde a página carregar completamente

### ✅ **2.2 - Abrir Console**
1. Pressione **F12** (ou Ctrl+Shift+I)
2. Clique na aba **"Console"**
3. Se houver mensagens antigas, clique no ícone **🗑️** para limpar

### ✅ **2.3 - Verificar Filtros**
1. Clique no ícone de filtro **🔍**
2. Certifique-se que **"All levels"** está selecionado
3. Não deve haver texto nos filtros

---

## 🚀 **PASSO 3: Testar Manualmente**

### ✅ **3.1 - Teste Básico**
No console, digite e pressione Enter:
```javascript
console.log('🎮 Teste manual funcionando!');
```
**Resultado esperado**: Deve aparecer a mensagem no console

### ✅ **3.2 - Teste da Extensão**
No console, digite e pressione Enter:
```javascript
console.log('Tooltip existe:', document.querySelector('#ps-game-info-tooltip'));
```
**Resultado esperado**: Deve mostrar o elemento tooltip ou null

---

## 🚀 **PASSO 4: Verificar Logs da Extensão**

### ✅ **4.1 - Recarregar Página**
1. Pressione **F5** para recarregar
2. Observe o console imediatamente

### ✅ **4.2 - Logs Esperados**
Você deve ver:
```
🎮 ===========================================
🎮 PlayStation Game Info extension loaded
🎮 ===========================================
📍 Página atual: https://www.playstation.com/pt-br/ps-plus/games/
⏰ Timestamp: [hora atual]
✅ Tooltip criado e adicionado ao DOM
🎯 Encontrados X elementos com seletor: div[class*="card-grid"] a
```

---

## 🚀 **PASSO 5: Testar Hover**

### ✅ **5.1 - Passar Mouse sobre Jogos**
1. Passe o mouse sobre os cards de jogos
2. Observe o console

### ✅ **5.2 - Logs Esperados**
Você deve ver:
```
🔗 Link dentro de card-grid detectado: [elemento]
🎮 Nome do jogo detectado: [Nome do Jogo]
✅ Nome extraído: [Nome] | Método: elemento filho (.card_name__mLuPs p)
```

---

## 🚀 **PASSO 6: Usar Script de Teste**

### ✅ **6.1 - Copiar Script**
1. Abra o arquivo `test-extension.js`
2. Copie todo o conteúdo

### ✅ **6.2 - Colar no Console**
1. Cole o script no console
2. Pressione Enter
3. Observe os resultados

### ✅ **6.3 - Interpretar Resultados**
- **"Extensão funcionando: SIM"** = Tudo OK
- **"Extensão funcionando: NÃO"** = Há problemas

---

## 🚀 **PASSO 7: Solução de Problemas**

### ❌ **Problema: Nenhum log aparece**
**Soluções:**
1. Verificar se extensão está ativa
2. Recarregar extensão
3. Recarregar página
4. Verificar URL correta

### ❌ **Problema: Só aparecem erros**
**Soluções:**
1. Limpar console
2. Verificar filtros
3. Habilitar todos os níveis de log

### ❌ **Problema: Logs aparecem mas tooltip não funciona**
**Soluções:**
1. Verificar se elementos são detectados
2. Verificar se nome do jogo é extraído
3. Verificar se tooltip é criado

---

## 🚀 **PASSO 8: Verificação Final**

### ✅ **Checklist Completo:**
- [ ] Extensão ativada em `chrome://extensions/`
- [ ] Extensão recarregada
- [ ] Página recarregada (F5)
- [ ] Console aberto (F12)
- [ ] Filtros do console limpos
- [ ] URL correta do PlayStation Plus
- [ ] Logs de inicialização aparecem
- [ ] Elementos de jogos são detectados
- [ ] Mouse passado sobre jogos
- [ ] Logs de hover aparecem

---

## 🆘 **Se Nada Funcionar**

### ✅ **Reinstalar Extensão:**
1. Remover de `chrome://extensions/`
2. Recarregar página
3. Reinstalar extensão
4. Testar novamente

### ✅ **Verificar Navegador:**
1. Testar em modo incógnito
2. Desabilitar outras extensões
3. Verificar se Chrome está atualizado

---

**Siga estes passos e os logs devem aparecer! 🔍✨**
