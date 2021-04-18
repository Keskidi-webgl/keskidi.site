import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {INTERACT_POINT_NAME, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import SceneConfig from '~/core/config/scene.config'
import {MezzanineConfig} from "~/core/config/roomConfig";

class MezzanineInteractPointConfig extends InteractPointConfigElement {
  protected _name = INTERACT_POINT_NAME.MEZZANINE

  protected _canvasCoords = () => {
    return SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.position
  }

  protected _isCompleted = (): boolean => {
    return false;
  }

  protected _url = MezzanineConfig.fullUrl

}

export default new MezzanineInteractPointConfig()
