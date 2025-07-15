/**
 * SuperNetos - Utilitários Globais
 * Funções e constantes reutilizáveis em todo o projeto
 */

/**
 * Constantes globais do projeto
 */
const SUPERNETOS = {
  // URLs das páginas do jogo
  PAGINAS: {
    INICIO: "index.html",
    SELECAO_PERSONAGEM: "src/paginas/selecao-personagem.html",
    PERGUNTA_01: "src/paginas/perguntas/pergunta01.html",
    PERGUNTA_02: "src/paginas/perguntas/pergunta02.html",
    RESULTADOS: "src/paginas/resultados.html",
  },

  // Configurações de áudio
  AUDIO: {
    VOLUME_PADRAO: 0.3,
    MUSICA_FUNDO: "src/recursos/audio/background_music.mp3",
  },

  // Chaves do armazenamento local
  CHAVES_ARMAZENAMENTO: {
    PROGRESSO_JOGO: "progressoJogo",
    TOTAL_TENTATIVAS: "totalTentativas",
    PERSONAGEM_SELECIONADO: "personagemSelecionado",
  },

  // Pontos de quebra responsivos (breakpoints)
  BREAKPOINTS: {
    CELULAR: "600px",
    TABLET: "768px",
    DESKTOP: "1024px",
  },

  // Caminhos dos recursos
  CAMINHOS: {
    ESTILOS: "src/estilos/",
    SCRIPTS: "src/scripts/",
    IMAGENS_PERSONAGENS: "src/recursos/imagens/personagens/",
    IMAGENS_INTERFACE: "src/recursos/imagens/interface/",
    IMAGENS_ILUSTRACOES: "src/recursos/imagens/ilustracoes/",
    AUDIO: "src/recursos/audio/",
  },
};

/**
 * Utilitários de navegação entre páginas
 */
const Navegacao = {
  /**
   * Navega para uma página salvando o estado do áudio
   * @param {string} pagina - URL da página de destino
   */
  irPara(pagina) {
    if (window.gerenciadorAudio) {
      window.gerenciadorAudio.salvarEstado();
    }
    window.location.href = pagina;
  },

  /**
   * Volta para a página inicial
   */
  irParaInicio() {
    this.irPara(SUPERNETOS.PAGINAS.INICIO);
  },

  /**
   * Vai para a página de seleção de personagem
   */
  irParaSelecaoPersonagem() {
    this.irPara(SUPERNETOS.PAGINAS.SELECAO_PERSONAGEM);
  },

  /**
   * Vai para a primeira pergunta do jogo
   */
  irParaJogo() {
    this.irPara(SUPERNETOS.PAGINAS.PERGUNTA_01);
  },

  /**
   * Vai para a página de resultados
   */
  irParaResultados() {
    this.irPara(SUPERNETOS.PAGINAS.RESULTADOS);
  },

  /**
   * Vai para uma pergunta específica
   * @param {number} numeroPergunta - Número da pergunta (1, 2, etc.)
   */
  irParaPergunta(numeroPergunta) {
    const pagina =
      SUPERNETOS.PAGINAS[
        `PERGUNTA_${numeroPergunta.toString().padStart(2, "0")}`
      ];
    if (pagina) {
      this.irPara(pagina);
    } else {
      console.error(`Pergunta ${numeroPergunta} não encontrada`);
    }
  },
};

/**
 * Utilitários de gerenciamento de progresso do jogo
 */
const ProgressoJogo = {
  /**
   * Salva o progresso de uma pergunta
   * @param {number} numeroPergunta - Número da pergunta
   * @param {string} resposta - Resposta selecionada
   * @param {number} tentativas - Número de tentativas realizadas
   */
  salvarPergunta(numeroPergunta, resposta, tentativas) {
    let progresso = this.obterProgresso();

    const indicePergunta = progresso.findIndex(
      (item) => item.pergunta === numeroPergunta
    );

    const dadosPergunta = {
      pergunta: numeroPergunta,
      resposta: resposta,
      quantidade: tentativas,
    };

    if (indicePergunta === -1) {
      progresso.push(dadosPergunta);
    } else {
      progresso[indicePergunta] = dadosPergunta;
    }

    localStorage.setItem(
      SUPERNETOS.CHAVES_ARMAZENAMENTO.PROGRESSO_JOGO,
      JSON.stringify(progresso)
    );
  },

  /**
   * Obtém o progresso completo do jogo
   * @returns {Array} Array com o progresso de todas as perguntas
   */
  obterProgresso() {
    const progresso = localStorage.getItem(
      SUPERNETOS.CHAVES_ARMAZENAMENTO.PROGRESSO_JOGO
    );
    return progresso ? JSON.parse(progresso) : [];
  },

  /**
   * Obtém o total de tentativas realizadas
   * @returns {number} Número total de tentativas
   */
  obterTotalTentativas() {
    return parseInt(
      localStorage.getItem(SUPERNETOS.CHAVES_ARMAZENAMENTO.TOTAL_TENTATIVAS) ||
        "0"
    );
  },

  /**
   * Incrementa o total de tentativas
   * @returns {number} Novo total de tentativas
   */
  incrementarTentativas() {
    const atual = this.obterTotalTentativas();
    const novoTotal = atual + 1;
    localStorage.setItem(
      SUPERNETOS.CHAVES_ARMAZENAMENTO.TOTAL_TENTATIVAS,
      novoTotal.toString()
    );
    return novoTotal;
  },

  /**
   * Limpa todo o progresso do jogo
   */
  reiniciar() {
    localStorage.removeItem(SUPERNETOS.CHAVES_ARMAZENAMENTO.PROGRESSO_JOGO);
    localStorage.removeItem(SUPERNETOS.CHAVES_ARMAZENAMENTO.TOTAL_TENTATIVAS);
    localStorage.removeItem(
      SUPERNETOS.CHAVES_ARMAZENAMENTO.PERSONAGEM_SELECIONADO
    );
  },

  /**
   * Salva o personagem selecionado pelo jogador
   * @param {string} personagem - Identificador do personagem
   */
  salvarPersonagemSelecionado(personagem) {
    localStorage.setItem(
      SUPERNETOS.CHAVES_ARMAZENAMENTO.PERSONAGEM_SELECIONADO,
      personagem
    );
  },

  /**
   * Obtém o personagem selecionado pelo jogador
   * @returns {string|null} Identificador do personagem ou null se não selecionado
   */
  obterPersonagemSelecionado() {
    return localStorage.getItem(
      SUPERNETOS.CHAVES_ARMAZENAMENTO.PERSONAGEM_SELECIONADO
    );
  },
};

/**
 * Utilitários de interface do usuário
 */
const InterfaceUsuario = {
  /**
   * Mostra/esconde conteúdo baseado na seção selecionada
   * @param {string} secao - Seção a ser mostrada
   * @param {Array} secoes - Lista de todas as seções disponíveis
   */
  mostrarConteudo(
    secao,
    secoes = ["inicio", "historia", "objetivo", "regras", "creditos"]
  ) {
    secoes.forEach((id) => {
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.style.display = id === secao ? "block" : "none";
        // Página inicial usa display flex para centralização
        if (id === "inicio" && secao === "inicio") {
          elemento.style.display = "flex";
        }
      }
    });

    // Atualiza navegação ativa no cabeçalho
    const links = document.querySelectorAll(".header-right ul li a");
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${secao}`) {
        link.classList.add("active");
      }
    });
  },

  /**
   * Cria um overlay modal para exibir conteúdo
   * @param {string|HTMLElement} conteudo - Conteúdo a ser exibido no modal
   * @param {Object} opcoes - Opções de configuração do modal
   * @returns {HTMLElement} Elemento do overlay criado
   */
  criarOverlay(conteudo, opcoes = {}) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;

    const modal = document.createElement("div");
    modal.className = "modal-content";
    modal.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 10px;
      max-width: 90vw;
      max-height: 90vh;
      overflow: auto;
    `;

    if (typeof conteudo === "string") {
      modal.innerHTML = conteudo;
    } else {
      modal.appendChild(conteudo);
    }

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Fecha o modal ao clicar fora dele
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
      }
    });

    return overlay;
  },

  /**
   * Mostra mensagem de feedback para o usuário
   * @param {string} mensagem - Texto da mensagem
   * @param {string} tipo - Tipo da mensagem (info, sucesso, aviso, erro)
   * @param {number} duracao - Duração em milissegundos para auto-remoção
   */
  mostrarMensagem(mensagem, tipo = "info", duracao = 3000) {
    const elementoMensagem = document.createElement("div");
    elementoMensagem.className = `mensagem mensagem-${tipo}`;
    elementoMensagem.textContent = mensagem;
    elementoMensagem.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      z-index: 2000;
      animation: slideInRight 0.3s ease;
    `;

    // Cores baseadas no tipo de mensagem
    const cores = {
      info: "#2196F3",
      sucesso: "#4CAF50",
      aviso: "#FF9800",
      erro: "#F44336",
    };

    elementoMensagem.style.backgroundColor = cores[tipo] || cores.info;

    document.body.appendChild(elementoMensagem);

    // Remove a mensagem após a duração especificada
    setTimeout(() => {
      if (elementoMensagem.parentNode) {
        elementoMensagem.style.animation = "slideOutRight 0.3s ease";
        setTimeout(() => {
          document.body.removeChild(elementoMensagem);
        }, 300);
      }
    }, duracao);
  },
};

/**
 * Utilitários de detecção de dispositivo
 */
const Dispositivo = {
  /**
   * Verifica se é um dispositivo móvel
   * @returns {boolean} True se for dispositivo móvel
   */
  ehCelular() {
    return window.innerWidth <= parseInt(SUPERNETOS.BREAKPOINTS.CELULAR);
  },

  /**
   * Verifica se é um tablet
   * @returns {boolean} True se for tablet
   */
  ehTablet() {
    const largura = window.innerWidth;
    return (
      largura > parseInt(SUPERNETOS.BREAKPOINTS.CELULAR) &&
      largura <= parseInt(SUPERNETOS.BREAKPOINTS.TABLET)
    );
  },

  /**
   * Verifica se é desktop
   * @returns {boolean} True se for desktop
   */
  ehDesktop() {
    return window.innerWidth > parseInt(SUPERNETOS.BREAKPOINTS.TABLET);
  },

  /**
   * Verifica se está em orientação paisagem (horizontal)
   * @returns {boolean} True se estiver em orientação paisagem
   */
  ehPaisagem() {
    return window.innerWidth > window.innerHeight;
  },

  /**
   * Verifica se está em orientação retrato (vertical)
   * @returns {boolean} True se estiver em orientação retrato
   */
  ehRetrato() {
    return window.innerHeight > window.innerWidth;
  },

  /**
   * Obtém informações detalhadas sobre o dispositivo
   * @returns {Object} Objeto com informações do dispositivo
   */
  obterInformacoes() {
    return {
      largura: window.innerWidth,
      altura: window.innerHeight,
      ehCelular: this.ehCelular(),
      ehTablet: this.ehTablet(),
      ehDesktop: this.ehDesktop(),
      ehPaisagem: this.ehPaisagem(),
      ehRetrato: this.ehRetrato(),
      userAgent: navigator.userAgent,
    };
  },
};

// Disponibiliza objetos globalmente para uso em outras partes do projeto
window.SUPERNETOS = SUPERNETOS;
window.Navegacao = Navegacao;
window.ProgressoJogo = ProgressoJogo;
window.InterfaceUsuario = InterfaceUsuario;
window.Dispositivo = Dispositivo;

// Mantém compatibilidade com nomes antigos (será removido em versões futuras)
window.Navigation = Navegacao; // DEPRECATED: usar Navegacao
window.GameProgress = ProgressoJogo; // DEPRECATED: usar ProgressoJogo
window.UI = InterfaceUsuario; // DEPRECATED: usar InterfaceUsuario
window.Device = Dispositivo; // DEPRECATED: usar Dispositivo
