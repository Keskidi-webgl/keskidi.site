import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";

const LoungeCameraPosition: CameraPosition = {
  name: '',

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    cameraPos.x = -400
    cameraPos.y = 130
    cameraPos.z = 300

    return { cameraPos, lookAtPosition }
  }
}

export default LoungeCameraPosition
