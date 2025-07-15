# SuperNetos 🎮👴👵

Um jogo educativo digital desenvolvido para promover a valorização das pessoas idosas, estimulando o respeito inter-geracional, a empatia e o reconhecimento dos direitos da pessoa idosa.

## 🎮 **JOGAR AGORA**

### 🌟 **[🕹️ CLIQUE AQUI PARA JOGAR O SUPERNETOS! 🕹️](https://j0aod3v.github.io/SuperNetos/)**

> 🚀 **Jogue diretamente no seu navegador!** Não precisa baixar nada - funciona em computador, tablet e celular!

## 📚 Documentação

Este projeto possui documentação técnica completa seguindo padrões profissionais de engenharia de software:

- **📚 [Documentação Técnica](./documentacao/README.md)** - Índice completo da documentação
- **🏗️ [Estrutura do Projeto](./documentacao/ESTRUTURA_PROJETO.md)** - Arquitetura, diagramas UML e metodologias
- **🎯 [Melhorias Implementadas](./documentacao/MELHORIAS_IMPLEMENTADAS.md)** - Resumo das melhorias v2.0
- **🔧 [Histórico de Correções](./documentacao/HISTORICO_CORRECOES.md)** - Evolução e melhorias implementadas
- **🗺️ [Roadmap Completo](./documentacao/ROADMAP_COMPLETO.md)** - Planejamento estratégico e sprints
- **✅ [Checklist de Validação](./documentacao/CHECKLIST_VALIDACAO.md)** - Quality assurance e certificação

A documentação inclui diagramas UML, análise de complexidade de software, métricas ISO 25010 e roadmap detalhado por sprints.a promover a valorização das pessoas idosas, estimulando o respeito intergeracional, a empatia e o reconhecimento dos direitos da pessoa idosa.

## 🎯 Objetivo

O jogo **SuperNetos** tem como objetivo promover a valorização das pessoas idosas, estimulando, de forma lúdica e educativa, o respeito intergeracional, a empatia e o reconhecimento dos direitos da pessoa idosa, contribuindo para a formação cidadã de crianças e adolescentes.

## 🚀 Como Jogar

1. **Acesse o jogo** - Abra o `index.html` em qualquer navegador moderno
2. **Escolha seu personagem** - Selecione entre menino ou menina
3. **Responda às perguntas** - Use sabedoria para fazer as melhores escolhas
4. **Acumule pontos** - Quanto mais acertos, mais longe você avança
5. **Torne-se um Super Neto!** - Complete os desafios e aprenda sobre convivência intergeracional

## 📚 Documentação

Este projeto possui documentação técnica completa seguindo padrões profissionais de engenharia de software:

- **📋 [Índice da Documentação](./documentacao/INDICE.md)** - Guia de navegação de todos os documentos
- **🏗️ [Estrutura do Projeto](./documentacao/ESTRUTURA_PROJETO.md)** - Arquitetura, diagramas UML e metodologias
- **🔧 [Histórico de Correções](./documentacao/HISTORICO_CORRECOES.md)** - Evolução e melhorias implementadas
- **🗺️ [Roadmap Completo](./documentacao/ROADMAP_COMPLETO.md)** - Planejamento estratégico e sprints
- **✅ [Checklist de Validação](./documentacao/CHECKLIST_VALIDACAO.md)** - Quality assurance e certificação

A documentação inclui diagramas UML, análise de complexidade de software, métricas ISO 25010 e roadmap detalhado por sprints.

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura das páginas e semântica
- **CSS3** - Estilização moderna e responsividade
- **JavaScript ES6+** - Interatividade e lógica do jogo (Vanilla JS)
- **LocalStorage** - Persistência de dados do jogador
- **Material Symbols** - Ícones da interface do Google
- **Web APIs** - Audio API, Orientation API

## 💻 Desenvolvimento

### 🤖 Assistência de IA

Este projeto foi desenvolvido com a assistência de **Claude Sonnet 4** (Anthropic), utilizado como agente de desenvolvimento no Visual Studio Code durante julho de 2025. A IA auxiliou significativamente em:

- 🏗️ **Refatoração e organização** do código seguindo padrões de engenharia de software
- 📚 **Documentação técnica** completa com diagramas UML e metodologias formais
- 🔧 **Correção de bugs** e otimização de performance
- 🇧🇷 **Tradução e padronização** para português brasileiro
- 📊 **Implementação de métricas** de qualidade e boas práticas

_A colaboração humano-IA resultou em um projeto que demonstra excelência técnica e educacional._

### Arquitetura Modular e Organizada

O projeto foi completamente refatorado seguindo as melhores práticas de engenharia de software:

#### 🎵 Sistema de Áudio Global (`GerenciadorAudio`)

- Gerenciamento centralizado da música de fundo
- Persistência automática do estado do áudio entre páginas
- Controle global de volume e mute com interface visual
- Compatibilidade total com políticas de autoplay dos navegadores modernos

#### 🎮 Sistema de Progresso (`ProgressoJogo`)

- Rastreamento automático do progresso do jogador
- Persistência segura no localStorage do navegador
- Sistema de pontuação e tentativas
- Gerenciamento de personagem selecionado

#### 🔧 Utilitários Globais (`SUPERNETOS`)

- Constantes centralizadas para fácil manutenção
- Sistema de navegação consistente entre páginas
- Configurações responsivas para diferentes dispositivos
- Caminhos organizados para todos os recursos

#### 📱 Interface Responsiva (`InterfaceUsuario`)

- Detecção automática de dispositivo e orientação
- Modais e overlays nativos
- Sistema de notificações integrado
- Controles adaptativos para diferentes telas

```javascript
// Exemplos de uso das funções em português
Navegacao.irParaSelecaoPersonagem(); // Navega para seleção de personagem
ProgressoJogo.salvarPergunta(1, 0, 3); // Salva resposta da pergunta 1
InterfaceUsuario.mostrarMensagem("Parabéns!", "sucesso"); // Mostra mensagem
Dispositivo.ehCelular(); // Verifica se é dispositivo móvel
```

#### 🔊 Componente de Volume (`ControleVolume`)

- Controles de volume reutilizáveis em qualquer página
- Integração automática com sistema de áudio
- Posicionamento flexível e responsivo
- Estilos personalizáveis via CSS

```javascript
// Criar controle de volume com configuração personalizada
const controleVolume = criarControleVolume("container-id", {
  position: "absolute",
  top: "20px",
  right: "20px",
});
```

### 🎨 CSS Modular com Variáveis

Sistema de design consistente usando CSS Custom Properties:

```css
:root {
  --primary-color: #f4750d;
  --secondary-color: #fcfc00;
  --spacing-md: 1.5rem;
  --transition-normal: 0.3s ease;
}
```

### Responsividade

- **Orientação automática**: Força modo paisagem para melhor experiência
- **Breakpoints adaptativos**: Design otimizado para mobile, tablet e desktop
- **Aspect ratio fixo**: Mantém proporção 16:9 em todas as telas

## 🏆 Características Técnicas

### ✨ Funcionalidades

- [x] Sistema de áudio global com persistência
- [x] Navegação entre páginas com estado preservado
- [x] Controles de volume reutilizáveis
- [x] Interface responsiva e adaptativa
- [x] Gerenciamento de progresso do jogador
- [x] Feedback visual e sonoro
- [x] Compatibilidade cross-browser

### 🔧 Boas Práticas Implementadas

- [x] **Separação de responsabilidades** (HTML/CSS/JS)
- [x] **Código reutilizável** (componentes modulares)
- [x] **Documentação adequada** (comentários em português e README atualizado)
- [x] **Padrões consistentes** (nomenclatura em português e estrutura organizada)
- [x] **Otimização de performance** (carregamento lazy e recursos organizados)
- [x] **Acessibilidade básica** (alt texts, títulos descritivos)

## 🔄 Melhorias na Versão 2.0

### ✨ Principais Mudanças

1. **🗂️ Reestruturação Completa do Projeto**

   - Organização em pastas lógicas (`src/`, `documentacao/`)
   - Separação clara de responsabilidades
   - Hierarquia intuitiva e navegável

2. **🇧🇷 Padronização em Português**

   - Todos os nomes de funções, variáveis e comentários em português brasileiro
   - Documentação completamente traduzida
   - Manutenção de compatibilidade temporária com nomes antigos

3. **📂 Categorização Inteligente de Recursos**

   - Imagens organizadas por função (personagens, ilustrações, interface)
   - Áudio separado em pasta específica
   - Estrutura escalável para futuras expansões

4. **⚡ Código Mais Limpo e Documentado**

   - Funções com documentação JSDoc completa
   - Comentários explicativos em português claro
   - Modularização e reutilização de código

5. **📱 Melhor Suporte a Dispositivos**
   - Sistema robusto de detecção de dispositivos
   - Orientação e responsividade aprimoradas
   - Testes em múltiplas resoluções

### 🛡️ Compatibilidade

A versão 2.0 mantém **total compatibilidade** com navegadores modernos:

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Suporte completo a dispositivos móveis e tablets
- Funcionalidade em redes lentas

### 📋 Próximos Passos

- [ ] **Implementação de mais perguntas** (utilizando ilustrações 03-25)
- [ ] **Sistema de conquistas e badges**
- [ ] **Modo multiplayer local**
- [ ] **Relatórios de progresso para educadores**
- [ ] **Testes automatizados**
- [ ] **PWA (Progressive Web App)**

## 👥 Equipe de Desenvolvimento

### 🎓 Orientação Acadêmica

- **Miriam Fernanda Sanches Alarcon** - Orientadora e idealizadora do jogo e website
- **Carina Bortolato Major** - Coorientadora do website
- **Edna Aparecida Lopes Bezerra Katakura** - Coorientadora e idealizadora do jogo
- **Cristiano Massao Tashima** - Coorientador e idealizador do jogo

### 🔬 Pesquisa

- **Adriane Aparecida Betini dos Santos** - Mestranda em enfermagem em atenção primária à saúde
- **Izabelly Simeão Marques** - Bolsista PIBIC

### 💻 Desenvolvimento

- **João Cláudio Fernandes Michelato Colaço** - Desenvolvedor Voluntário do Website

### 🤖 Assistência de IA

- **Claude Sonnet 4 (Anthropic)** - Agente de desenvolvimento no VSCode (Julho 2025)
  - Refatoração e organização do código
  - Documentação técnica e diagramas UML
  - Implementação de padrões de engenharia de software
  - Tradução e padronização para português brasileiro
  - Quality assurance e métricas de qualidade

## 🏫 Instituições

- **UENP** (Universidade Estadual do Norte do Paraná)
- **FAMEMA** (Faculdade de Medicina de Marília)

## 📜 Licença

Este projeto é parte de uma iniciativa acadêmica desenvolvida pela UENP em parceria com a FAMEMA. Todos os direitos reservados às instituições participantes.

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 🐛 Reportar Problemas

Encontrou um bug ou tem uma sugestão? Abra uma [issue](https://github.com/J0aoD3v/SuperNetos/issues) descrevendo:

- Descrição do problema
- Passos para reproduzir
- Comportamento esperado
- Capturas de tela (se aplicável)
- Ambiente (navegador, versão, sistema operacional)

---

**SuperNetos** - Fortalecendo laços entre gerações através da educação e diversão! 🌟
