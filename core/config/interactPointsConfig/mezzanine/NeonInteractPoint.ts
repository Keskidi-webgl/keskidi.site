import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {MezzanineConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const NeonInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.NEON,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('just_chill')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  url: MezzanineConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.NEON,

  transformX: 0,

  transformY: 0
}

export default NeonInteractPoint
