import GlobalScene from "~/core/scene/GlobalScene";
import {Vector3} from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";

const TomInteractPoint: InteractionPoint = {
  name: 'tom',

  canvasCoords: () => {
    const position = new Vector3()
    GlobalScene.context.scene.getObjectByName('tom')!.getWorldPosition(position)
    position.z = position.z * 0.95
    position.y = (1 + position.y) * 3
    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => '/tom',

  transformX: 0,

  transformY: 0
}

export default TomInteractPoint
