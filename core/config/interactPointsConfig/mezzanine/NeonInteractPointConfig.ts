import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {MezzanineConfig} from "~/core/config/roomConfig";

class NeonInteractPointConfig extends InteractPointConfigElement {
  protected _name = INTERACT_POINT_NAME.NEON

  protected _canvasCoords = () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('just_chill')!.getWorldPosition(position)

    return position
  }

  protected _isCompleted = (): boolean => {
    return false;
  }

  protected _url = MezzanineConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.NEON

}

export default new NeonInteractPointConfig()
