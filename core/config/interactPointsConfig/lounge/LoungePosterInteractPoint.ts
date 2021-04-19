import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {LoungeConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";

const LoungePosterInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.LOUNGE_POSTER,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tableau_big')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  url: LoungeConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.LOUNGE_POSTER,

  transformX: 0,

  transformY: 0
}

export default LoungePosterInteractPoint
