import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import Helpers from "~/core/utils/helpers";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {VinylRoomObject} from "~/core/config/global-scene/room-objects";

const VinylInteractPoint: InteractionPoint = {
  name: VinylRoomObject.urlSlug,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('vinyles')!.getWorldPosition(position)

    return position
  },

  isCompleted: (globalStore: GlobalStore) => {
    return globalStore.userWordData!.some(word => word.id === Helpers.wordIdFromObject(URL_OBJECT_IDENTIFIER.VINYL) && word.is_achieved)
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => VinylRoomObject.fullUrl,

  transformX: 0,

  transformY: 0
}

export default VinylInteractPoint
