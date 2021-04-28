import {Vector3} from "three";
import {SceneManager} from "~/core/managers";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";

const TomCameraPosition: CameraPosition = {
  name: 'tom',
  coords: () => {
    const lookAtPosition = new Vector3()

    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tom')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.88
    lookAtPosition.y = lookAtPosition.y * 4

    const cameraPos = lookAtPosition.clone()
    cameraPos.z = cameraPos.z * 1.25
    cameraPos.x = -100
    cameraPos.y = cameraPos.y * 1.6

    return { cameraPos, lookAtPosition }
  }
}

export default TomCameraPosition
