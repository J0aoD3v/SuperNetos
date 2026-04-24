/**
 * VolumeControl - Componente de controle de volume reutilizável
 * Cria botões de volume que se conectam automaticamente ao AudioManager global
 */
class VolumeControl {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      size: options.size || "48px",
      iconSize: options.iconSize || "32px",
      position: options.position || "absolute",
      top: options.top || "12px",
      left: options.left || "12px",
      right: options.right || null,
      bottom: options.bottom || null,
      className: options.className || "volume-control",
      ...options,
    };

    this.button = null;
    this.icon = null;

    this.init();
  }

  /**
   * Inicializa o controle de volume
   */
  init() {
    this.createButton();
    this.setupEventListeners();
    this.updateIcon();
  }

  /**
   * Cria o botão de volume
   */
  createButton() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(
        `VolumeControl: Container ${this.containerId} não encontrado`
      );
      return;
    }

    // Container para agrupar botão e slider
    this.wrapper = document.createElement("div");
    Object.assign(this.wrapper.style, {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "rgba(30, 30, 30, 0.7)",
      padding: "5px 12px",
      borderRadius: "25px",
      position: this.options.position,
      top: this.options.top,
      left: this.options.left,
      zIndex: "10",
    });

    // Cria o botão
    this.button = document.createElement("button");
    this.button.className = this.options.className;
    this.button.title = "Clique para ajustar volume, Duplo clique para Mute";
    this.button.style.background = "transparent";
    this.button.style.border = "none";
    this.button.style.cursor = "pointer";
    this.button.style.display = "flex";

    // Cria o ícone
    this.icon = document.createElement("span");
    this.icon.className = "material-symbols-rounded";
    this.icon.style.fontSize = this.options.iconSize;
    this.icon.style.color = "#fff";

    // Cria o Slider (escondido inicialmente)
    this.slider = document.createElement("input");
    this.slider.type = "range";
    this.slider.min = "0";
    this.slider.max = "1";
    this.slider.step = "0.05";
    this.slider.style.cursor = "pointer";
    this.slider.style.width = "100px";
    this.slider.style.display = "none";

    this.button.appendChild(this.icon);
    this.wrapper.appendChild(this.button);
    this.wrapper.appendChild(this.slider);
    container.appendChild(this.wrapper);
  }
  /**
   * Aplica estilos ao botão
   */
  applyStyles() {
    const styles = {
      position: this.options.position,
      width: this.options.size,
      height: this.options.size,
      background: "rgba(30, 30, 30, 0.7)",
      borderRadius: "50%",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.2s",
      zIndex: "10",
    };

    // Posicionamento
    if (this.options.top) styles.top = this.options.top;
    if (this.options.left) styles.left = this.options.left;
    if (this.options.right) styles.right = this.options.right;
    if (this.options.bottom) styles.bottom = this.options.bottom;

    Object.assign(this.button.style, styles);

    // Hover effect
    this.button.addEventListener("mouseenter", () => {
      this.button.style.background = "rgba(60, 60, 60, 0.85)";
    });

    this.button.addEventListener("mouseleave", () => {
      this.button.style.background = "rgba(30, 30, 30, 0.7)";
    });
  }

  /**
   * Configura os event listeners
   */
  setupEventListeners() {
    if (!this.button || !this.slider) return;

    // Clique único: Mostrar/Esconder slider
    this.button.addEventListener("click", () => {
      this.slider.style.display = (this.slider.style.display === "none") ? "block" : "none";
    });

    // Clique duplo: Mute/Unmute
    this.button.addEventListener("dblclick", () => {
      if (window.audioManager) {
        window.audioManager.toggleMute();
        this.updateIcon();
        this.updateSlider();
      }
    });

    // Mudança no Slider
    this.slider.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      if (window.audioManager) {
        window.audioManager.setVolume(vol);
        if (vol > 0 && window.audioManager.isMuted()) {
          window.audioManager.toggleMute();
          this.updateIcon();
        } else if (vol === 0 && !window.audioManager.isMuted()) {
          window.audioManager.toggleMute();
          this.updateIcon();
        }
      }
    });

    // Inicializa valor do slider
    const checkAudioManager = () => {
      if (window.audioManager) {
        this.updateIcon();
        this.updateSlider();
      } else {
        setTimeout(checkAudioManager, 100);
      }
    };
    checkAudioManager();
  }

  /**
   * Atualiza o ícone baseado no estado do áudio
   */
  updateIcon() {
    if (!this.icon || !window.audioManager) return;

    const isMuted = window.audioManager.isMuted();
    this.icon.textContent = isMuted ? "volume_off" : "volume_up";
  }
  /**
   * Atualiza o slider baseado no estado do áudio
   */
  updateSlider() {
    if (!this.slider || !window.audioManager) return;
    this.slider.value = window.audioManager.isMuted() ? 0 : window.audioManager.getVolume();
  }

  /**
   * Remove o controle de volume
   */
  destroy() {
    if (this.button && this.button.parentNode) {
      this.button.parentNode.removeChild(this.button);
    }
  }
}

/**
 * Função helper para criar controles de volume facilmente
 */
function createVolumeControl(containerId, options = {}) {
  return new VolumeControl(containerId, options);
}

// Disponibiliza globalmente
window.VolumeControl = VolumeControl;
window.createVolumeControl = createVolumeControl;

