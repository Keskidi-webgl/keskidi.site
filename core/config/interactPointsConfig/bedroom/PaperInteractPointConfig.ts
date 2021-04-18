import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {BedroomConfig} from "~/core/config/roomConfig";

class PaperInteractPointConfig extends InteractPointConfigElement {
  protected _name = INTERACT_POINT_NAME.PAPER

  protected _canvasCoords = () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('papier_anim')!.getWorldPosition(position)

    return position
  }

  protected _isCompleted = (): boolean => {
    return false;
  }

  protected _url = BedroomConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.PAPER

}

export default new PaperInteractPointConfig()
