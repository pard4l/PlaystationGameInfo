# 📁 Estrutura do Projeto - PlayStation Game Info

## 🎯 Arquivos Principais

### Core da Extensão
- **`manifest.json`** - Configuração da extensão (Manifest V3)
- **`content.js`** - Script principal que detecta jogos e mostra tooltips
- **`background.js`** - Service worker para comunicação com API
- **`styles.css`** - Estilos do tooltip e animações

### Interface do Usuário
- **`popup.html`** - Interface de configurações da extensão
- **`popup.js`** - Lógica do popup de configurações

### Recursos Visuais
- **`icons/icon.svg`** - Ícone base da extensão
- **`generate-icons.html`** - Gerador de ícones em diferentes tamanhos

### Documentação
- **`README.md`** - Documentação completa do projeto
- **`INSTALACAO.md`** - Guia de instalação rápida
- **`ESTRUTURA.md`** - Este arquivo

### Desenvolvimento Futuro
- **`api-example.js`** - Exemplo de como a API real funcionará
- **`config.js`** - Configurações centralizadas da extensão

## 🔧 Funcionalidades Implementadas

### ✅ Detecção Automática de Jogos
- Múltiplos seletores CSS para diferentes layouts
- MutationObserver para páginas dinâmicas
- Fallback para elementos de título
- Filtros para evitar falsos positivos

### ✅ Tooltip Inteligente
- Design inspirado no PlayStation
- Posicionamento automático
- Animações suaves
- Responsivo e acessível

### ✅ Sistema de Cache
- Cache em memória para performance
- Timeout configurável
- Limpeza automática

### ✅ Configurações do Usuário
- Interface amigável
- Persistência com Chrome Storage
- Toggles para personalização

### ✅ Dados Mock
- Template conforme especificado
- Dados realistas para demonstração
- Estrutura preparada para API real

## 🎮 Como Funciona

1. **Detecção**: A extensão monitora a página em busca de elementos de jogos
2. **Hover**: Quando o usuário passa o mouse sobre um jogo, extrai o nome
3. **Busca**: Consulta a API (atualmente mock) para obter informações
4. **Exibição**: Mostra tooltip com dados formatados
5. **Cache**: Armazena resultados para melhor performance

## 📊 Dados Exibidos

```json
{
  "name": "Nome do jogo",
  "coop": "YES/NO",
  "online": "X players / not available",
  "local": "X players / not available", 
  "online + local": "YES / not available",
  "metacritic": 86
}
```

## 🚀 Próximos Passos

1. **Gerar ícones**: Use `generate-icons.html`
2. **Instalar**: Carregue no Chrome como extensão não empacotada
3. **Testar**: Navegue para a página do PlayStation Plus
4. **Personalizar**: Configure através do popup da extensão

## 🔮 Roadmap

- [ ] Integração com API real
- [ ] Suporte a mais páginas do PlayStation
- [ ] Histórico de jogos
- [ ] Comparação entre jogos
- [ ] Notificações
- [ ] Suporte a outros navegadores

---

**Extensão criada com sucesso! 🎉**
