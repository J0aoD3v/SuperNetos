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

    // Cria o botão
    this.button = document.createElement("button");
    this.button.className = this.options.className;
    this.button.title = "Ligar/desligar música";

    // Aplica estilos
    this.applyStyles();

    // Cria o ícone
    this.icon = document.createElement("span");
    this.icon.className = "material-symbols-rounded";
    this.icon.style.fontSize = this.options.iconSize;
    this.icon.style.color = "#fff";

    this.button.appendChild(this.icon);
    container.appendChild(this.button);
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
    if (!this.button) return;

    this.button.addEventListener("click", () => {
      if (window.audioManager) {
        window.audioManager.toggleMute();
        this.updateIcon();
      }
    });

    // Atualiza o ícone quando o AudioManager estiver disponível
    const checkAudioManager = () => {
      if (window.audioManager) {
        this.updateIcon();
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
