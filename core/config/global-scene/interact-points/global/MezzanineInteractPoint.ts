import {SceneManager} from "~/core/managers";
import {MezzanineConfig} from "~/core/config/roomConfig";
import {Vector3} from "three";
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";

const MezzanineInteractPoint: InteractionPoint = {
  name: '',

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalModule: GlobalModule, authModule: AuthModule): boolean {
    return authModule.isAuth
  },

  url: MezzanineConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default MezzanineInteractPoint
