import {MEDIA_TYPE} from "~/core/enums";
import {UserWordData, Word} from "~/core/types";

export default class Helpers {

  /**
   * Return current ratio of the window
   */
  public static getWindowRatio(): number {
    return (window.devicePixelRatio) ? window.devicePixelRatio : 1
  }

  /**
   * Return current size of the window
   */
  public static getWindowSizes() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  /**
   * Return icon of media type
   */
  public static mediaTypeToIcon(mediaType: MEDIA_TYPE) {
    let icon = ''
    switch (mediaType) {
      case MEDIA_TYPE.AUDIO:
        icon = 'file-audio'
        break;
      case MEDIA_TYPE.VIDEO:
        icon = 'file-video'
        break;
      case MEDIA_TYPE.GLTF:
        icon = 'cubes'
        break;
      case MEDIA_TYPE.IMAGE:
        icon = 'file-image'
        break;
    }

    return icon
  }

  /**
   * Interpolation method
   * https://en.wikipedia.org/wiki/Linear_interpolation
   */
  public static lerp(start: number, end: number, value: number) {
    return (1 - value) * start + value * end;
  }

  /**
   * Helper to check if a word is achieved
   */
  public static isActivityWordAchieved(word: Word, achievedWords: Array<UserWordData>) {
    return achievedWords.find(word => word.id === word!.id)
  }

  /**
   * Convert degree to radiant
   */
  public static degreeToRadiant(degree: number) {
    return degree * Math.PI / 180
  }

  /**
   * Plurialize words
   */
  public static pluralize(word: string, quantity: number) {
    return `${word}${(quantity > 1) ? 's' : ''}`
  }

  public static spanify(text: string) {
    return text.split(/(\s+)/).map(letter => `<span>${letter}</span>`).join('')
  }
}
