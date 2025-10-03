# 🎮 Correção do Nome do Jogo - Card Name

## ❌ Problema Identificado

O tooltip estava mostrando o ID do jogo em vez do nome real que está dentro do elemento:
```html
<div class="card_name__mLuPs text--3 txt-style-secondary--m-0">
  <p>11-11 Memories Retold</p>
</div>
```

## ✅ Correções Implementadas

### 1. **Seletores Específicos para Card Name**
Adicionados seletores específicos para encontrar o nome do jogo:

```css
/* Prioridade 1: Seletores específicos para PlayStation Plus */
'.card_name__mLuPs p'        /* Parágrafo dentro do card_name */
'.card_name__mLuPs'          /* Div card_name diretamente */
'div[class*="card_name"] p'  /* Parágrafo em qualquer card_name */
'div[class*="card_name"]'    /* Qualquer div com card_name */
```

### 2. **Busca em Elementos Pais**
- Se o link não contém o nome diretamente, busca nos elementos pais
- Procura até 5 níveis acima do link
- Foca especificamente em elementos `card_name`

### 3. **Logs de Debug Específicos**
- Log especial quando nome é encontrado no `card_name`
- Informações sobre método de extração
- Debug da busca em elementos pais

## 🧪 Como Testar a Correção

### 1. **Recarregar a Extensão**
```bash
# No Chrome:
# 1. Vá para chrome://extensions/
# 2. Clique no botão de recarregar da extensão
# 3. Recarregue a página do PlayStation Plus
```

### 2. **Abrir Console de Debug**
- Pressione `F12`
- Vá para a aba "Console"
- Navegue para: https://www.playstation.com/pt-br/ps-plus/games/

### 3. **Logs Esperados**

**Quando passar o mouse sobre um jogo:**
```
🔗 Link dentro de card-grid detectado: [elemento]
🎮 Nome do jogo detectado: 11-11 Memories Retold
✅ Nome extraído: 11-11 Memories Retold | Método: elemento filho (.card_name__mLuPs p) | Elemento: A [classes]
🎮 Nome do jogo encontrado no card_name: 11-11 Memories Retold
```

**Se buscar em elementos pais:**
```
✅ Nome extraído: 11-11 Memories Retold | Método: elemento pai (2 níveis) | Elemento: A [classes]
🎮 Nome do jogo encontrado no card_name: 11-11 Memories Retold
```

### 4. **Comportamento Esperado**

✅ **Deve funcionar:**
- Tooltip mostra o nome real do jogo (ex: "11-11 Memories Retold")
- Nome é extraído do elemento `card_name__mLuPs`
- Logs mostram método de extração correto

❌ **NÃO deve funcionar:**
- Tooltip mostrando ID do jogo
- Nome extraído do href ou outros elementos incorretos

## 🎯 Estrutura HTML Esperada

A extensão agora funciona com esta estrutura:

```html
<div class="card-grid_abc123">
  <a href="/games/11-11-memories-retold">
    <div class="card_name__mLuPs text--3 txt-style-secondary--m-0">
      <p>11-11 Memories Retold</p>
    </div>
    <!-- Outros elementos do card -->
  </a>
</div>
```

## 🔍 Métodos de Extração (em ordem de prioridade)

1. **Atributos de dados**: `data-game-name`, `title`, etc.
2. **Href do link**: Extração da URL (fallback)
3. **Texto do link**: Texto visível do link (fallback)
4. **Card name específico**: `.card_name__mLuPs p` ⭐ **NOVO**
5. **Card name genérico**: `div[class*="card_name"] p` ⭐ **NOVO**
6. **Elementos pais**: Busca em até 5 níveis acima ⭐ **NOVO**
7. **Alt text de imagens**: Fallback final

## 🚀 Exemplo de Funcionamento

### **Antes (Problema):**
```
Nome extraído: 11-11-memories-retold | Método: href do link
```

### **Depois (Corrigido):**
```
Nome extraído: 11-11 Memories Retold | Método: elemento filho (.card_name__mLuPs p)
🎮 Nome do jogo encontrado no card_name: 11-11 Memories Retold
```

## 🐛 Solução de Problemas

### **Ainda mostra ID em vez do nome:**
1. Verifique se o elemento `card_name__mLuPs` existe na página
2. Verifique se a classe não mudou (pode ser `card_name__ABC123`)
3. Verifique os logs para ver qual método está sendo usado

### **Nome não é encontrado:**
1. Verifique se o elemento `p` está dentro do `card_name`
2. Verifique se há texto no elemento
3. Teste com diferentes jogos

### **Busca em elementos pais não funciona:**
1. Verifique se o link está dentro de um card-grid
2. Verifique se há elementos `card_name` nos pais
3. Aumente o `maxDepth` se necessário

---

**Nome do jogo corrigido! 🎮✨**
