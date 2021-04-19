import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {BedroomConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const SkateInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.SKATE,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('skate')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  url: BedroomConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.SKATE,

  transformX: 0,

  transformY: 0
}

export default SkateInteractPoint
