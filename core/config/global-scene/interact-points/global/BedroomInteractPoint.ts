import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {Bedroom} from "~/core/config/global-scene/rooms";

const BedroomInteractPoint: InteractionPoint = {
  name: Bedroom.urlSlug,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return authStore.isAuth
  },

  url: () => Bedroom.fullUrl,

  transformX: 0,

  transformY: 0
}

export default BedroomInteractPoint