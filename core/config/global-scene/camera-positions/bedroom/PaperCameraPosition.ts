import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const PaperCameraPosition: CameraPosition = {
  name: '',

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('papier_anim')!.getWorldPosition(lookAtPosition)
    lookAtPosition.x = lookAtPosition.x * 0.95
    lookAtPosition.z = lookAtPosition.z * 1.1

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 3
    cameraPos.x = cameraPos.x * 0.9

    return { cameraPos, lookAtPosition }
  }
}

export default PaperCameraPosition
