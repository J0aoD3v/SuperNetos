/**
 * CaptionsManager - Gerenciador de Legendas/Closed Captions
 * Sincroniza legendas SRT com o áudio de fundo
 * Trabalha com o ControlsManager para funcionalidade global
 */
class CaptionsManager {
  constructor(audioElementId = "bg-music", srtFile = "/SuperNetos/src/recursos/audio/Heroic_por.srt") {
    this.audioElementId = audioElementId;
    this.srtFile = srtFile;
    this.captions = [];
    this.currentCaption = null;
    this.audioElement = null;
    this.captionsContainer = null;

    this.init();
  }

  /**
   * Inicializa o gerenciador de legendas
   */
  async init() {
    console.log(`🎯 CaptionsManager: Inicializando - SRT: ${this.srtFile}`);
    // Criar container de legendas se não existir
    this.createCaptionsContainer();

    // Carregar legendas do arquivo SRT
    await this.loadCaptions();

    // Setup de sincronização
    this.setupSyncronization();
  }

  /**
   * Cria o container que exibe as legendas
   */
  createCaptionsContainer() {
    let container = document.getElementById("captions-display");

    if (!container) {
      container = document.createElement("div");
      container.id = "captions-display";
      container.className = "captions-display";
      
      // Remove a restauração do localStorage para não forçar estado salvo
      // const captionsEnabled = localStorage.getItem("captionsEnabled") === "1";
      // container.style.display = captionsEnabled ? "flex" : "none";
      
      // Define padrão como "none" se quiser, mas sem ler do localStorage
      container.style.display = "none";

      document.body.appendChild(container);
      console.log(`✅ CaptionsManager: Container CRIADO - ID: ${container.id}, Display: ${container.style.display}, Body children: ${document.body.children.length}`);
    } else {
      console.log(`ℹ️ CaptionsManager: Container JÁ EXISTE - ID: ${container.id}, Display: ${container.style.display}`);
    }

    this.captionsContainer = container;
  }

  /**
   * Carrega e parseia o arquivo SRT
   */
  async loadCaptions() {
    try {
      console.log(`📥 CaptionsManager: Tentando carregar SRT de: ${this.srtFile}`);
      const response = await fetch(this.srtFile);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const text = await response.text();
      this.captions = this.parseSRT(text);
      console.log(`✅ CaptionsManager: ${this.captions.length} legendas carregadas com sucesso!`);
    } catch (error) {
      console.error(`❌ CaptionsManager: Erro ao carregar arquivo SRT de ${this.srtFile}:`, error);
      this.captions = [];
    }
  }

  /**
   * Parseia um arquivo SRT
   */
  parseSRT(content) {
    const captions = [];
    const blocks = content.split(/\n\s*\n/);

    for (const block of blocks) {
      const lines = block.trim().split("\n");
      if (lines.length < 3) continue;

      const timeLine = lines[1];
      const timeMatch = timeLine.match(
        /(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})/
      );

      if (timeMatch) {
        const startTime =
          parseInt(timeMatch[1]) * 3600 +
          parseInt(timeMatch[2]) * 60 +
          parseInt(timeMatch[3]) +
          parseInt(timeMatch[4]) / 1000;

        const endTime =
          parseInt(timeMatch[5]) * 3600 +
          parseInt(timeMatch[6]) * 60 +
          parseInt(timeMatch[7]) +
          parseInt(timeMatch[8]) / 1000;

        const text = lines.slice(2).join("\n").trim();

        captions.push({
          startTime,
          endTime,
          text,
        });
      }
    }

    return captions;
  }
  

  /**
   * Configura sincronização de legendas com áudio
   */
  setupSyncronization() {
    let attempts = 0;
    const checkAudioElement = () => {
      const audio = document.getElementById(this.audioElementId);
      if (audio) {
        this.audioElement = audio;

        // Atualizar legendas conforme o tempo de reprodução
        this.audioElement.addEventListener("timeupdate", () => {
          this.updateCaption();
        });

        // Limpar legenda quando a música parar
        this.audioElement.addEventListener("pause", () => {
          this.clearCaption();
        });

        console.log(`✅ CaptionsManager: Sincronização ativada (tentativas: ${attempts})`);
      } else {
        attempts++;
        if (attempts <= 15) {
          console.log(`⏳ CaptionsManager: Aguardando elemento #${this.audioElementId}... (tentativa ${attempts})`);
          setTimeout(checkAudioElement, 100);
        } else {
          console.error(`❌ CaptionsManager: Elemento #${this.audioElementId} não encontrado após 15 tentativas!`);
        }
      }
    };
    checkAudioElement();
  }

  /**
   * Atualiza a legenda baseada no tempo atual da música
   */
  updateCaption() {
    if (!this.audioElement || !this.captionsContainer) {
      // Log apenas uma vez por sessão para não poluir console
      if (!this.__loggedMissingElements) {
        console.warn(`⚠️ CaptionsManager: Faltam elementos - audioElement: ${!!this.audioElement}, container: ${!!this.captionsContainer}`);
        this.__loggedMissingElements = true;
      }
      return;
    }

    // Verificar se legendas estão habilitadas
    if (this.captionsContainer.style.display === "none") return;

    const currentTime = this.audioElement.currentTime;
    const caption = this.captions.find(
      (cap) => currentTime >= cap.startTime && currentTime <= cap.endTime
    );

    if (caption && caption !== this.currentCaption) {
      this.currentCaption = caption;
      this.captionsContainer.textContent = caption.text;
      // Log a cada nova legenda (descomente para debug detalhado)
      // console.log(`📝 Legenda: ${caption.text.substring(0, 50)}...`);
    } else if (!caption && this.currentCaption) {
      this.currentCaption = null;
      this.captionsContainer.textContent = "";
    }
  }

  /**
   * Limpa a legenda atual
   */
  clearCaption() {
    this.currentCaption = null;
    if (this.captionsContainer) {
      this.captionsContainer.textContent = "";
    }
  }
}

// Instância global única
const captionsManager = new CaptionsManager();

// Disponibilizar globalmente
window.CaptionsManager = CaptionsManager;
window.captionsManager = captionsManager;

