import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {MezzanineConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const MezzanineInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.MEZZANINE,

  canvasCoords: () => {
    return SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.position

  },

  isCompleted: () => {
    return false;
  },

  url: MezzanineConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default MezzanineInteractPoint
