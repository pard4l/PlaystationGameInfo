# 🐛 Debug - PlayStation Game Info Extension

## 🔍 Como Verificar se a Extensão Está Funcionando

### 1. Abrir o Console do Navegador
1. Pressione `F12` ou `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
2. Vá para a aba **"Console"**
3. Recarregue a página do PlayStation Plus

### 2. Logs Esperados

Quando a extensão carregar, você deve ver:

```
🎮 PlayStation Game Info extension loaded
📍 Página atual: https://www.playstation.com/pt-br/ps-plus/games/
🎯 Encontrados X elementos com seletor: .game-card
🎯 Encontrados X elementos com seletor: .product-card
...
```

### 3. Testar Detecção de Jogos

Quando passar o mouse sobre um jogo, você deve ver:

```
🎮 Nome do jogo detectado: [Nome do Jogo]
✅ Nome extraído: [Nome do Jogo] | Método: [método] | Elemento: [tag] [classes]
```

### 4. Logs de Debug Detalhados

#### ✅ **Sucesso - Nome Detectado**
```
🎮 Nome do jogo detectado: The Last of Us Part II
✅ Nome extraído: The Last of Us Part II | Método: elemento filho | Elemento: DIV game-card
```

#### ❌ **Falha - Nome Não Encontrado**
```
❌ Nenhum nome encontrado no elemento: DIV container
```

#### 🚫 **Rejeição - Nome Inválido**
```
🚫 Nome rejeitado (muito curto ou não é jogo): PS4
```

## 🔧 Solução de Problemas

### Problema: Nenhum log aparece
**Solução:**
1. Verifique se a extensão está ativada em `chrome://extensions/`
2. Recarregue a página (F5)
3. Verifique se está na URL correta: `https://www.playstation.com/pt-br/ps-plus/games/`

### Problema: "Nenhum nome encontrado"
**Solução:**
1. A página pode ter mudado de estrutura
2. Verifique se os seletores CSS ainda funcionam
3. Passe o mouse sobre diferentes elementos da página

### Problema: Nomes incorretos sendo detectados
**Solução:**
1. Verifique os logs para ver qual método está sendo usado
2. Ajuste os filtros na função `isNotAGameName()`

## 📊 Métodos de Extração

A extensão tenta extrair o nome do jogo usando 4 métodos:

1. **Atributo de dados**: `data-game-name`, `data-product-name`, `title`
2. **Elemento filho**: Procura por `.title`, `.game-title`, `h1`, `h2`, etc.
3. **Texto do elemento**: Se o próprio elemento for um título (H1-H6)
4. **Alt text da imagem**: `alt` ou `title` de imagens

## 🎯 Seletores CSS Monitorados

A extensão monitora estes seletores para detectar jogos:

- `.game-card`
- `.product-card`
- `.game-item`
- `[data-testid*="game"]`
- `.ps-plus-game`
- `.catalog-item`
- `.game-tile`

## 📝 Exemplo de Logs Completos

```
🎮 PlayStation Game Info extension loaded
📍 Página atual: https://www.playstation.com/pt-br/ps-plus/games/
🎯 Encontrados 20 elementos com seletor: .game-card
🎯 Encontrados 0 elementos com seletor: .product-card
🎯 Encontrados 0 elementos com seletor: .game-item
🎯 Encontrados 0 elementos com seletor: [data-testid*="game"]
🎯 Encontrados 0 elementos com seletor: .ps-plus-game
🎯 Encontrados 0 elementos com seletor: .catalog-item
🎯 Encontrados 0 elementos com seletor: .game-tile

[Usuário passa mouse sobre um jogo]

🎮 Nome do jogo detectado: 11-11 Memories Retold
✅ Nome extraído: 11-11 Memories Retold | Método: elemento filho | Elemento: DIV game-card
```

## 🚀 Próximos Passos

Se os logs estão funcionando corretamente:

1. ✅ A extensão está detectando jogos
2. ✅ Os nomes estão sendo extraídos
3. ✅ O tooltip deve aparecer com as informações

Se não está funcionando, verifique:
- Se está na página correta
- Se a extensão está ativada
- Se há erros no console
- Se os seletores CSS ainda são válidos

---

**Debug ativo! 🐛✨**
