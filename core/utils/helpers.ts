import {MEDIA_TYPE, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {WORD_ID} from "~/core/enums/word";

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
   *
   * @param objectIdentifier
   */
  public static wordIdFromObject(objectIdentifier: URL_OBJECT_IDENTIFIER) {
    switch (objectIdentifier) {
      case URL_OBJECT_IDENTIFIER.TELEVISION:
        return WORD_ID.NOOB
      case URL_OBJECT_IDENTIFIER.NEON:
        return WORD_ID.CHILL
      case URL_OBJECT_IDENTIFIER.MEZZA_POSTER:
        return WORD_ID.TISE
      case URL_OBJECT_IDENTIFIER.LOUNGE_POSTER:
        return WORD_ID.ENJAILLER
      case URL_OBJECT_IDENTIFIER.VINYL:
        return WORD_ID.MOULAGA
      case URL_OBJECT_IDENTIFIER.MAGAZINE:
        return WORD_ID.GHOSTER
      case URL_OBJECT_IDENTIFIER.T_SHIRT:
        return WORD_ID.GAMOS
      case URL_OBJECT_IDENTIFIER.PAPER:
        return WORD_ID.CRUSH
      case URL_OBJECT_IDENTIFIER.SKATE:
        return WORD_ID.HENDEK
    }
  }

}
