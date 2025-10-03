# 🎮 PlayStation Game Info - Chrome Extension

Uma extensão para Chrome que mostra informações detalhadas dos jogos do PlayStation Plus ao passar o mouse sobre eles.

## ✨ Funcionalidades

- **Informações em tempo real**: Passe o mouse sobre qualquer jogo na página do PlayStation Plus
- **Dados detalhados**: Mostra informações sobre modo cooperativo, jogadores online, local e pontuação no Metacritic
- **Interface elegante**: Tooltip com design inspirado no PlayStation
- **Configurável**: Personalize quais informações são exibidas
- **Performance otimizada**: Cache inteligente e carregamento assíncrono

## 📋 Informações Exibidas

Para cada jogo, a extensão mostra:

```json
{
  "name": "Nome do jogo",
  "coop": "YES/NO",
  "online": "X players / not available",
  "local": "X players / not available", 
  "online + local": "X players / not available",
  "metacritic": 86
}
```

## 🚀 Instalação

### Método 1: Carregamento Manual (Desenvolvimento)

1. **Clone ou baixe este repositório**
   ```bash
   git clone <repository-url>
   cd PlaystationGameInfo
   ```

2. **Gere os ícones da extensão**
   - Abra o arquivo `generate-icons.html` no seu navegador
   - Clique em "Download" para cada tamanho de ícone (16px, 48px, 128px)
   - Salve os arquivos como `icon16.png`, `icon48.png`, `icon128.png` na pasta `icons/`

3. **Instale a extensão no Chrome**
   - Abra o Chrome e vá para `chrome://extensions/`
   - Ative o "Modo do desenvolvedor" no canto superior direito
   - Clique em "Carregar sem compactação"
   - Selecione a pasta do projeto

### Método 2: Instalação via Chrome Web Store (Futuro)

*Esta extensão será publicada na Chrome Web Store em breve.*

## 🎯 Como Usar

1. **Navegue para a página do PlayStation Plus**
   - Acesse: https://www.playstation.com/pt-br/ps-plus/games/

2. **Passe o mouse sobre qualquer jogo**
   - A extensão detectará automaticamente os elementos de jogos
   - Um tooltip aparecerá com as informações detalhadas

3. **Configure as preferências**
   - Clique no ícone da extensão na barra de ferramentas
   - Use os toggles para personalizar quais informações são exibidas

## ⚙️ Configurações

A extensão permite personalizar:

- **Mostrar informações**: Liga/desliga a extensão
- **Mostrar Metacritic**: Exibe ou oculta a pontuação do Metacritic
- **Mostrar Co-op**: Exibe ou oculta informações de modo cooperativo

## 🔧 Desenvolvimento

### Estrutura do Projeto

```
PlaystationGameInfo/
├── manifest.json          # Configuração da extensão
├── content.js             # Script principal (detecta jogos)
├── background.js          # Service worker
├── popup.html             # Interface de configurações
├── popup.js               # Lógica do popup
├── styles.css             # Estilos do tooltip
├── icons/                 # Ícones da extensão
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── generate-icons.html    # Gerador de ícones
└── README.md              # Este arquivo
```

### Tecnologias Utilizadas

- **Manifest V3**: Última versão da API de extensões do Chrome
- **Vanilla JavaScript**: Sem dependências externas
- **CSS3**: Estilos modernos com gradientes e animações
- **Chrome Storage API**: Para salvar configurações
- **MutationObserver**: Para detectar mudanças dinâmicas na página

### API de Dados

Atualmente, a extensão usa dados mock para demonstração. A estrutura da API futura será:

```javascript
// Endpoint: GET /api/games/{gameName}
{
  "name": "string",
  "coop": "YES|NO",
  "online": "string",
  "local": "string", 
  "online + local": "string",
  "metacritic": number
}
```

## 🐛 Solução de Problemas

### A extensão não funciona

1. Verifique se está na página correta do PlayStation Plus
2. Recarregue a página (F5)
3. Verifique se a extensão está ativada nas configurações

### Tooltip não aparece

1. Verifique se a extensão está habilitada no popup
2. Tente passar o mouse sobre diferentes elementos da página
3. Verifique o console do navegador para erros

### Informações incorretas

- Atualmente usando dados mock para demonstração
- A API real será implementada em versões futuras

## 📝 Changelog

### v1.0.0
- ✅ Detecção automática de jogos na página
- ✅ Tooltip com informações detalhadas
- ✅ Interface de configurações
- ✅ Dados mock para demonstração
- ✅ Design responsivo e acessível

## 🔮 Roadmap

- [ ] Integração com API real de dados de jogos
- [ ] Suporte a mais páginas do PlayStation Store
- [ ] Histórico de jogos visualizados
- [ ] Comparação entre jogos
- [ ] Notificações de novos jogos
- [ ] Suporte a outros navegadores (Firefox, Edge)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

- Abra uma [issue](https://github.com/your-repo/issues) no GitHub
- Entre em contato via email: [seu-email@exemplo.com]

---

**Desenvolvido com ❤️ para a comunidade PlayStation**
