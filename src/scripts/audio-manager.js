/**
 * AudioManager - Sistema global de gerenciamento de áudio
 * Centraliza todo o controle de música de fundo em uma única classe reutilizável
 */
class AudioManager {
  constructor() {
    this.audio = null;
    this.musicStarted = false;
    this.defaultVolume = 0.3;

    // Configurações do localStorage
    this.storageKeys = {
      time: "bgMusicTime",
      muted: "bgMusicMuted",
      started: "bgMusicStarted",
    };

    this.init();
  }

  /**
   * Inicializa o sistema de áudio
   */
  init() {
    // Encontra o elemento de áudio na página
    this.audio = document.getElementById("bg-music");

    if (!this.audio) {
      console.warn("AudioManager: Elemento de áudio não encontrado");
      return;
    }

    // Configura o áudio
    this.audio.volume = this.defaultVolume;
    this.audio.loop = true;

    // Restaura o estado salvo
    this.restoreState();

    // Configura eventos
    this.setupEventListeners();
  }

  /**
   * Configura os event listeners necessários
   */
  setupEventListeners() {
    // Salva o estado antes de sair da página
    window.addEventListener("beforeunload", () => this.saveState());

    // Permite reprodução após interação do usuário
    const enableAudioAfterInteraction = () => {
      if (!this.isMuted()) {
        this.musicStarted = true;
        this.updatePlayState();
      }
      document.body.removeEventListener("click", enableAudioAfterInteraction);
    };

    document.body.addEventListener("click", enableAudioAfterInteraction);
  }

  /**
   * Salva o estado atual do áudio no localStorage
   */
  saveState() {
    if (!this.audio) return;

    localStorage.setItem(this.storageKeys.time, this.audio.currentTime);
    localStorage.setItem(this.storageKeys.muted, this.audio.muted ? "1" : "0");
    localStorage.setItem(
      this.storageKeys.started,
      this.musicStarted ? "1" : "0"
    );
  }

  /**
   * Restaura o estado do áudio do localStorage
   */
  restoreState() {
    if (!this.audio) return;

    // Restaura estado muted
    const wasMuted = localStorage.getItem(this.storageKeys.muted) === "1";
    this.audio.muted = wasMuted;

    // Restaura se a música foi iniciada
    this.musicStarted = localStorage.getItem(this.storageKeys.started) === "1";

    // Restaura tempo de reprodução
    const savedTime = parseFloat(
      localStorage.getItem(this.storageKeys.time) || "0"
    );
    this.audio.currentTime = isNaN(savedTime) ? 0 : savedTime;

    // Inicia reprodução se necessário
    if (!wasMuted && this.musicStarted) {
      setTimeout(() => {
        this.audio.play().catch(() => {
          console.log(
            "AudioManager: Reprodução automática bloqueada pelo navegador"
          );
        });
      }, 200);
    }
  }

  /**
   * Alterna entre mudo e som
   */
  toggleMute() {
    if (!this.audio) return;

    const currentlyMuted = this.audio.muted;
    this.audio.muted = !currentlyMuted;

    localStorage.setItem(this.storageKeys.muted, this.audio.muted ? "1" : "0");

    if (!this.audio.muted) {
      this.musicStarted = true;
      localStorage.setItem(this.storageKeys.started, "1");
    }

    this.updatePlayState();
    return !currentlyMuted;
  }

  /**
   * Verifica se o áudio está mudo
   */
  isMuted() {
    return this.audio ? this.audio.muted : true;
  }

  /**
   * Atualiza o estado de reprodução
   */
  updatePlayState() {
    if (!this.audio) return;

    if (!this.audio.muted && this.musicStarted) {
      this.audio.play().catch(() => {
        console.log("AudioManager: Não foi possível reproduzir o áudio");
      });
    } else {
      this.audio.pause();
    }
  }

  /**
   * Define o volume do áudio
   */
  setVolume(volume) {
    if (!this.audio) return;

    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Obtém o volume atual
   */
  getVolume() {
    return this.audio ? this.audio.volume : 0;
  }

  /**
   * Para completamente o áudio
   */
  stop() {
    if (!this.audio) return;

    this.audio.pause();
    this.audio.currentTime = 0;
    this.musicStarted = false;
  }

  /**
   * Reproduz o áudio
   */
  play() {
    if (!this.audio) return;

    this.musicStarted = true;
    this.audio.muted = false;
    localStorage.setItem(this.storageKeys.muted, "0");
    localStorage.setItem(this.storageKeys.started, "1");

    this.updatePlayState();
  }

  /**
   * Pausa o áudio
   */
  pause() {
    if (!this.audio) return;

    this.audio.pause();
  }
}

// Instância global do AudioManager
window.audioManager = null;

/**
 * Inicializa o AudioManager quando o DOM estiver carregado
 */
document.addEventListener("DOMContentLoaded", function () {
  window.audioManager = new AudioManager();
});
