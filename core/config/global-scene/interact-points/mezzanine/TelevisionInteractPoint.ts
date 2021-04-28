import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {TelevisionRoomObject} from "~/core/config/global-scene/room-objects";

const TelevisionInteractPoint: InteractionPoint = {
  name: TelevisionRoomObject.urlSlug,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tv')!.getWorldPosition(position)

    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => TelevisionRoomObject.fullUrl,

  transformX: 0,

  transformY: 0
}

export default TelevisionInteractPoint
