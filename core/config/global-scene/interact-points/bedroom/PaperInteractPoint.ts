import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {BedroomConfig} from "~/core/config/roomConfig";
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";

const PaperInteractPoint: InteractionPoint = {
  name: '',

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('papier_anim')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalModule: GlobalModule, authModule: AuthModule): boolean {
    return true;
  },

  url: BedroomConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.PAPER,

  transformX: 0,

  transformY: 0
}

export default PaperInteractPoint
