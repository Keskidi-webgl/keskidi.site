import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {MezzanineConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";
import {Vector3} from "three";

const MezzanineInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.MEZZANINE,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  url: MezzanineConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default MezzanineInteractPoint
