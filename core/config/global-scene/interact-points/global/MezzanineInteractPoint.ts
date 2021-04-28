import {SceneManager} from "~/core/managers";
import {MezzanineConfig} from "~/core/config/roomConfig";
import {Vector3} from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
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

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return authStore.isAuth
  },

  url: MezzanineConfig.fullUrl,

  transformX: 0,

  transformY: 0
}

export default MezzanineInteractPoint
