/**
 * ControlsManager - Gerenciador Global Centralizado
 * Cria e gerencia TODOS os controles (Volume + CC) de forma centralizada
 * Funciona em qualquer página automaticamente
 */
class ControlsManager {
  constructor() {
    this.volumeControl = null;
    this.captionsControl = null;
  }

  /**
   * Inicializa todos os controles
   */
  init() {
    console.log("🎮 ControlsManager: Inicializando sistema de controles...");
    
    // Aguardar o DOM estar pronto
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Configura todos os controles
   */
  setup() {
    // Buscar elemento de áudio
    const audioElement = document.getElementById("bg-music");
    if (!audioElement) {
      console.error("❌ ControlsManager: Elemento audio#bg-music não encontrado");
      return;
    }

    console.log("✅ ControlsManager: Elemento de áudio encontrado, criando controles...");

    // Criar controle de volume
    this.createVolumeControl();

    // Criar controle de legendas
    this.createCaptionsControl();
    
    console.log("✅ ControlsManager: Controles criados com sucesso!");
  }

  /**
   * Cria o botão de volume
   */
  createVolumeControl() {
    // Criar botão de volume
    const volumeBtn = document.createElement("button");
    volumeBtn.className = "volume-control";
    volumeBtn.id = "global-volume-btn";
    volumeBtn.title = "Ligar/desligar música";
    volumeBtn.setAttribute("aria-label", "Controlar volume da música");

    // Aplicar estilos inline
    volumeBtn.style.cssText = `
      position: absolute;
      width: 48px;
      height: 48px;
      background: rgba(30, 30, 30, 0.7);
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
      z-index: 999;
      top: 12px;
      left: 12px;
    `;

    // Criar ícone
    const icon = document.createElement("span");
    icon.className = "material-symbols-rounded";
    icon.id = "global-volume-icon";
    icon.style.cssText = `
      font-size: 32px;
      color: #fff;
    `;
    icon.textContent = "volume_up";

    volumeBtn.appendChild(icon);
    document.body.appendChild(volumeBtn);

    // Hover effects
    volumeBtn.addEventListener("mouseenter", () => {
      volumeBtn.style.background = "rgba(60, 60, 60, 0.85)";
    });

    volumeBtn.addEventListener("mouseleave", () => {
      volumeBtn.style.background = "rgba(30, 30, 30, 0.7)";
    });

    // Click para mutar/desmutar
    volumeBtn.addEventListener("click", () => {
      const audio = document.getElementById("bg-music");
      if (audio) {
        audio.muted = !audio.muted;
        this.updateVolumeIcon();
        // Salvar estado
        localStorage.setItem("bgMusicMuted", audio.muted ? "1" : "0");
        // Sincronizar CC: desativar se música for mutada
        this.syncCaptionsWithAudio(audio.muted);
      }
    });

    // Atualizar ícone quando houver mudança
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.addEventListener("play", () => this.updateVolumeIcon());
      audio.addEventListener("pause", () => this.updateVolumeIcon());
      audio.addEventListener("volumechange", () => this.updateVolumeIcon());
    }

    this.volumeControl = volumeBtn;
    this.updateVolumeIcon();
  }

  /**
   * Atualiza o ícone de volume
   */
  updateVolumeIcon() {
    const icon = document.getElementById("global-volume-icon");
    const audio = document.getElementById("bg-music");

    if (!icon || !audio) return;

    icon.textContent = audio.muted ? "volume_off" : "volume_up";
  }

  /**
   * Cria o botão CC (legendas)
   */
  createCaptionsControl() {
    // Criar botão CC
    const ccBtn = document.createElement("button");
    ccBtn.className = "volume-control";
    ccBtn.id = "global-captions-btn";
    ccBtn.title = "Ligar/desligar legendas (CC)";
    ccBtn.setAttribute("aria-label", "Controlar legendas com closed captions");
    
    // Restaurar estado do localStorage
    const captionsEnabled = localStorage.getItem("captionsEnabled") === "1";
    ccBtn.dataset.active = captionsEnabled ? "true" : "false";
    
    console.log(`🎬 ControlsManager: Criando botão CC - Estado salvo: ${captionsEnabled ? "ativado" : "desativado"}`);
    
    // Aplicar estilos inline
    ccBtn.style.cssText = `
      position: absolute;
      width: 48px;
      height: 48px;
      background: rgba(30, 30, 30, 0.7);
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
      z-index: 999;
      top: 12px;
      left: 72px;
    `;

    // Criar ícone
    const icon = document.createElement("span");
    icon.className = "material-symbols-rounded";
    icon.id = "global-captions-icon";
    icon.style.cssText = `
      font-size: 32px;
      color: #fff;
    `;
    icon.textContent = captionsEnabled ? "closed_caption" : "closed_caption_disabled";

    ccBtn.appendChild(icon);
    document.body.appendChild(ccBtn);

    // Aplicar cor baseada no estado salvo
    if (captionsEnabled) {
      ccBtn.style.background = "rgba(76, 175, 80, 0.7)";
      console.log(`🎬 ControlsManager: CC botão em estado ATIVADO (verde)`);
    }

    // Hover effects
    ccBtn.addEventListener("mouseenter", () => {
      if (!ccBtn.dataset.active) {
        ccBtn.style.background = "rgba(60, 60, 60, 0.85)";
      }
    });

    ccBtn.addEventListener("mouseleave", () => {
      if (!ccBtn.dataset.active) {
        ccBtn.style.background = "rgba(30, 30, 30, 0.7)";
      }
    });

    // Click para ativar/desativar legendas
    ccBtn.addEventListener("click", () => {
      this.toggleCaptions(ccBtn, icon);
    });

    this.captionsControl = ccBtn;
  }

  /**
   * Alterna legendas on/off
   */
  toggleCaptions(btn, icon) {
    const audio = document.getElementById("bg-music");
    
    // Verificar se a música está mutada
    if (audio && audio.muted) {
      console.warn("⚠️ CC: Ativar legendas requer música ligada");
      // Não permitir ativar CC com música mutada
      btn.dataset.active = "false";
      return;
    }

    const isActive = btn.dataset.active === "true";
    btn.dataset.active = !isActive;

    const captionsDisplay = document.getElementById("captions-display");
    console.log(`📍 toggleCaptions: Container encontrado? ${!!captionsDisplay}`);
    if (captionsDisplay) {
      console.log(`   Display antes: ${captionsDisplay.style.display}`);
    }

    if (!isActive) {
      // Ativar legendas
      console.log("✅ CC: Legendas ATIVADAS");
      icon.textContent = "closed_caption";
      btn.style.background = "rgba(76, 175, 80, 0.7)";
      if (captionsDisplay) {
        captionsDisplay.style.display = "flex";
        console.log(`   Display depois: ${captionsDisplay.style.display}`);
      } else {
        console.error("❌ Container captions-display não encontrado!");
      }
      // Salvar estado
      localStorage.setItem("captionsEnabled", "1");
    } else {
      // Desativar legendas
      console.log("🔇 CC: Legendas DESATIVADAS");
      icon.textContent = "closed_caption_disabled";
      btn.style.background = "rgba(30, 30, 30, 0.7)";
      if (captionsDisplay) {
        captionsDisplay.style.display = "none";
      }
      // Salvar estado
      localStorage.setItem("captionsEnabled", "0");
    }
  }

  /**
   * Sincroniza CC com estado da música (muted/unmuted)
   */
  syncCaptionsWithAudio(isMuted) {
    console.log(`🔊 ControlsManager: Sincronizando CC com música - Mutada: ${isMuted}`);
    
    const ccBtn = document.getElementById("global-captions-btn");
    const icon = ccBtn ? ccBtn.querySelector(".material-symbols-rounded") : null;
    const captionsDisplay = document.getElementById("captions-display");

    if (!ccBtn || !icon || !captionsDisplay) {
      console.warn("⚠️ ControlsManager: Elementos para sincronizar não encontrados");
      return;
    }

    if (isMuted) {
      // Desativar CC quando música é mutada
      console.log("🔇 ControlsManager: Desativando CC (música mutada)");
      ccBtn.dataset.active = "false";
      icon.textContent = "closed_caption_disabled";
      ccBtn.style.background = "rgba(30, 30, 30, 0.7)";
      captionsDisplay.style.display = "none";
      localStorage.setItem("captionsEnabled", "0");
    } else {
      // Se CC estava ativado, reativar quando música volta
      const wasCaptionsEnabled = localStorage.getItem("captionsEnabled") === "1";
      if (wasCaptionsEnabled) {
        console.log("✅ ControlsManager: Reativando CC (música ligou)");
        ccBtn.dataset.active = "true";
        icon.textContent = "closed_caption";
        ccBtn.style.background = "rgba(76, 175, 80, 0.7)";
        captionsDisplay.style.display = "flex";
      }
    }
  }
}

// Instância global única
const controlsManager = new ControlsManager();

// Inicializar assim que o script carregar
controlsManager.init();

// Disponibilizar globalmente
window.ControlsManager = ControlsManager;
window.controlsManager = controlsManager;

console.log("📊 === RESUMO DO SISTEMA DE CONTROLES ===");
console.log("✅ ControlsManager carregado e instanciado");
console.log("📍 Página atual:", window.location.pathname);
console.log("🔊 Estado da música (localStorage):", localStorage.getItem("bgMusicMuted") === "1" ? "MUTADA" : "LIGADA");
console.log("📝 Estado CC (localStorage):", localStorage.getItem("captionsEnabled") === "1" ? "ATIVADO" : "DESATIVADO");
