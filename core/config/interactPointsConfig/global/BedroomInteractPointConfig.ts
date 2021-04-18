import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {BedroomConfig} from "~/core/config/roomConfig";

class BedroomInteractPointConfig extends InteractPointConfigElement {
  protected _name = INTERACT_POINT_NAME.BEDROOM

  protected _canvasCoords = () => {
    return SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
  }

  protected _isCompleted = (): boolean => {
    return false;
  }

  protected _url = BedroomConfig.fullUrl

}

export default new BedroomInteractPointConfig()
