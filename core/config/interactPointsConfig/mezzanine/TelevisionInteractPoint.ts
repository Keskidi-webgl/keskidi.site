import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {MezzanineConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";

const TelevisionInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.TELEVISION,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tv')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalModule: GlobalModule, authModule: AuthModule): boolean {
    return true;
  },

  url: MezzanineConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.TELEVISION,

  transformX: 0,

  transformY: 0
}

export default TelevisionInteractPoint
