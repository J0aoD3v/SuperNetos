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
    // Criar container para o botão e o slider
    const wrapper = document.createElement("div");
    wrapper.id = "global-volume-wrapper";
    wrapper.style.cssText = `
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(30, 30, 30, 0.7);
      border-radius: 25px;
      z-index: 999;
      top: 12px;
      left: 12px;
      padding: 0;
      width: 48px;
    `;

    // Criar botão de volume
    const volumeBtn = document.createElement("button");
    volumeBtn.className = "volume-control-btn"; // Classe nova para não pegar estilos globais que quebram o layout
    volumeBtn.id = "global-volume-btn";
    volumeBtn.title = "Clique para ajustar volume, Duplo clique para Mute";
    volumeBtn.setAttribute("aria-label", "Controlar volume da música");

    // Aplicar estilos inline no botão
    volumeBtn.style.cssText = `
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 48px;
      height: 48px;
      padding: 0;
      margin: 0;
      border-radius: 50%;
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

      // Criar Slider (escondido inicialmente)
      const sliderContainer = document.createElement("div");
      sliderContainer.id = "global-volume-slider-container";
      sliderContainer.style.cssText = `
        display: none;
        height: 100px;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
      `;

      const slider = document.createElement("input");
      slider.type = "range";
      slider.id = "global-volume-slider";
      slider.min = "0";
      slider.max = "1";
      slider.step = "0.05";
      slider.style.cssText = `
        cursor: pointer;
        width: 80px;
        transform: rotate(-90deg);
        margin: 0;
        padding: 0;
      `;

      // Configurar valor inicial do slider
      const audio = document.getElementById("bg-music");
      if (audio) {
        slider.value = audio.volume;
      }

      volumeBtn.appendChild(icon);
      wrapper.appendChild(volumeBtn);
      sliderContainer.appendChild(slider);
      wrapper.appendChild(sliderContainer);
      document.body.appendChild(wrapper);

      // Click único: Mostrar/Esconder slider
      volumeBtn.addEventListener("click", () => {
        sliderContainer.style.display = (sliderContainer.style.display === "none") ? "flex" : "none";
      });

    // Clique duplo para mutar/desmutar
    volumeBtn.addEventListener("dblclick", () => {
      const audioEl = document.getElementById("bg-music");
      if (audioEl) {
        if (audioEl.muted) {
          audioEl.muted = false;
          audioEl.currentTime = 0; // Reinicia a música ao ligar
          audioEl.play().catch(e => console.log("Erro ao reproduzir:", e));
        } else {
          audioEl.muted = true;
          audioEl.pause();
        }
        this.updateVolumeIcon();

        // Sincronizar CC: desativar se música for mutada
        this.syncCaptionsWithAudio(audioEl.muted);
      }
    });

    // Mudança no Slider
    slider.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      const audioEl = document.getElementById("bg-music");
      if (audioEl) {
        audioEl.volume = vol;
        if (vol > 0 && audioEl.muted) {
          audioEl.muted = false;
          audioEl.play().catch(e => console.log("Erro ao reproduzir:", e));
          this.updateVolumeIcon();
        } else if (vol === 0 && !audioEl.muted) {
          audioEl.muted = true;
          audioEl.pause();
          this.updateVolumeIcon();
        }
      }
    });

    // Atualizar ícone quando houver mudança externa
    if (audio) {
      audio.addEventListener("play", () => this.updateVolumeIcon());
      audio.addEventListener("pause", () => this.updateVolumeIcon());
      audio.addEventListener("volumechange", () => {
        this.updateVolumeIcon();
        slider.value = audio.volume;
      });
    }

    this.volumeControl = wrapper;
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
    
    // Ignorar estado do localStorage, começa sempre desativado
    const captionsEnabled = false;
    ccBtn.dataset.active = captionsEnabled ? "true" : "false";
    
    console.log(`🎬 ControlsManager: Criando botão CC - Estado fixo: desativado`);
    
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
      // Não salvar estado
      // localStorage.setItem("captionsEnabled", "1");
    } else {
      // Desativar legendas
      console.log("🔇 CC: Legendas DESATIVADAS");
      icon.textContent = "closed_caption_disabled";
      btn.style.background = "rgba(30, 30, 30, 0.7)";
      if (captionsDisplay) {
        captionsDisplay.style.display = "none";
      }
      // Não salvar estado
      // localStorage.setItem("captionsEnabled", "0");
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
      // Não salvar estado
      // localStorage.setItem("captionsEnabled", "0");
    } else {
      // Comportamento fixo: quando desmutar, se estava tentando ativar, reativa.
      // Como não salvamos mais, o padrão é não ativar CC automaticamente.
      console.log("✅ ControlsManager: Música ligada");
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

