import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {LoungeConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const LoungeInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.LOUNGE,

  canvasCoords: () => {
    return SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.position
  },

  isCompleted: () => {
    return false;
  },

  url: LoungeConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default LoungeInteractPoint
