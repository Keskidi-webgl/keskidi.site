import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {LoungeConfig} from "~/core/config/roomConfig";

class VinylInteractPointConfig extends InteractPointConfigElement {
  protected _name = INTERACT_POINT_NAME.VINYL

  protected _canvasCoords = () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('vinyles')!.getWorldPosition(position)

    return position
  }

  protected _isCompleted = (): boolean => {
    return false;
  }

  protected _url = LoungeConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.VINYL

}

export default new VinylInteractPointConfig()
