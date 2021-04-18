import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {LoungeConfig} from "~/core/config/roomConfig";

class LoungeInteractPointConfig extends InteractPointConfigElement {
  protected _name = INTERACT_POINT_NAME.LOUNGE

  protected _canvasCoords = () => {
    return SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.position
  }

  protected _isCompleted = (): boolean => {
    return false;
  }

  protected _url = LoungeConfig.fullUrl

}

export default new LoungeInteractPointConfig()
