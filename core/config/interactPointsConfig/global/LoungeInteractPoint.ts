import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {LoungeConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";
import {Vector3} from "three";
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";

const LoungeInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.LOUNGE,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalModule: GlobalModule, authModule: AuthModule): boolean {
    return authModule.isAuth
  },

  url: LoungeConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default LoungeInteractPoint
