import {AssetsManager} from "~/core/managers/index";
import {AUDIO_ASSET} from "~/core/enums";

class SoundDesignManager {

  playSound(soundName: string) {
    AssetsManager.getAudio(soundName).data.play()
  }

  stopSound(soundName: string) {
    AssetsManager.getAudio(soundName).data.pause()
    AssetsManager.getAudio(soundName).data.currentTime = 0
  }
}

const instance = new SoundDesignManager()

export default instance
