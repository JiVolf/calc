export const playSound = (soundName: string) => {
    const soundEnabled = JSON.parse(localStorage.getItem('appSettings') || '{}').soundOn ?? true;
    if (soundEnabled) {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.play();
    }
  };