import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";

const TomInteractPoint: InteractionPoint = {
  name: '',

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tom')!.getWorldPosition(position)
    position.z = position.z * 0.95
    position.y = (1 + position.y) * 3
    return position
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalModule: GlobalModule, authModule: AuthModule): boolean {
    return true;
  },

  url: '/tom',

  transformX: 0,

  transformY: 0
}

export default TomInteractPoint
