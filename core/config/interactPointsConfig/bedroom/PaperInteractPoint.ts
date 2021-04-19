import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {BedroomConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const PaperInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.PAPER,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('papier_anim')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  url: BedroomConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.PAPER,

  transformX: 0,

  transformY: 0
}

export default PaperInteractPoint
