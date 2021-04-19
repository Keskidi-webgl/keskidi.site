import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {BedroomConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";
import {Vector3} from "three";

const BedroomInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.BEDROOM,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  url: BedroomConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default BedroomInteractPoint
