import {MEDIA_TYPE} from "~/core/enums";

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

}
