import {INTERACT_POINT_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {InteractionPointConfig} from "~/core/types";
import {Vector3} from "three";

const TomInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.TOM,

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

  url: '/tom',

  transformX: 0,

  transformY: 0
}

export default TomInteractPoint
