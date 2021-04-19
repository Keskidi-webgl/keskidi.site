import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {BedroomConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const BedroomInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.BEDROOM,

  canvasCoords: () => {
    return SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
  },

  isCompleted: () => {
    return false;
  },

  url: BedroomConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default BedroomInteractPoint
