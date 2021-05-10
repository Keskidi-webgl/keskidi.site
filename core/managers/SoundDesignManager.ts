import {AssetsManager} from "~/core/managers/index";
import {AUDIO_ASSET} from "~/core/enums";

class SoundDesignManager {
  private _soundState: Array<{ name: AUDIO_ASSET, isPlaying: boolean }>

  constructor() {
    this._soundState = [
      {
        name: AUDIO_ASSET.BAD_ANSWER,
        isPlaying: false
      },
      {
        name: AUDIO_ASSET.GOOD_ANSWER,
        isPlaying: false
      },
      {
        name: AUDIO_ASSET.OUTSIDE_AMBIANCE,
        isPlaying: false
      },
      {
        name: AUDIO_ASSET.SKATE_STICKERS,
        isPlaying: false
      },
      {
        name: AUDIO_ASSET.GLOBAL_AMBIANCE,
        isPlaying: false
      },
      {
        name: AUDIO_ASSET.MOUSE_HOVER,
        isPlaying: false
      },
      {
        name: AUDIO_ASSET.SWOOSH,
        isPlaying: false
      }
    ]
  }

  playSound(soundName: string) {
    const sound = this._getSoundState(soundName)

    if (!sound.isPlaying) {
      AssetsManager.getAudio(soundName).data.currentTime = 0
      sound.isPlaying = true

      this.pushToArray(sound)
      return AssetsManager.getAudio(soundName).data.play()
        .then(() => {
          sound.isPlaying = false
        })
    }
  }

  stopSound(soundName: string) {
    const sound = this._getSoundState(soundName)

    if (sound.isPlaying) {
      AssetsManager.getAudio(soundName).data.pause()
      AssetsManager.getAudio(soundName).data.currentTime = 0
      sound.isPlaying = false
      this.pushToArray(sound)
    }
  }

  pushToArray(sound: { name: AUDIO_ASSET, isPlaying: boolean }) {
    const index = this._soundState.findIndex((soundLoop) => soundLoop.name === sound.name);
    if (index === -1) {
      this._soundState.push(sound);
    } else {
      this._soundState[index] = sound;
    }
  }

  private _getSoundState(soundName: string) {
    const sound = this._soundState.find(sound => sound.name === soundName)
    if (!sound) {
      throw new Error(`You need to add config for song ${soundName} on file SoundDesignManager`)
    }

    return sound
  }
}

const instance = new SoundDesignManager()

export default instance
