import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {BedroomConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const TshirtInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.T_SHIRT,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tshirt')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  url: BedroomConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.T_SHIRT,

  transformX: 0,

  transformY: 0
}

export default TshirtInteractPoint
