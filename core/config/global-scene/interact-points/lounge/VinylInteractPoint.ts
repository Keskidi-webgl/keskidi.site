import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {LoungeConfig} from "~/core/config/roomConfig";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import Helpers from "~/core/utils/helpers";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";

const VinylInteractPoint: InteractionPoint = {
  name: INTERACT_POINT_NAME.VINYL,

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

  url: LoungeConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.VINYL,

  transformX: 0,

  transformY: 0
}

export default VinylInteractPoint
