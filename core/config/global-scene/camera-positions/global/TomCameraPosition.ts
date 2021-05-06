import {Vector3} from "three";
import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";

const TomCameraPosition: CameraPosition = {
  name: 'tom',
  coords: () => {
    const lookAtPosition = new Vector3()

    GlobalScene.context.scene.getObjectByName('tom')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.88
    lookAtPosition.y = lookAtPosition.y * 3.3

    const cameraPos = lookAtPosition.clone()
    cameraPos.z = cameraPos.z * 1.4
    cameraPos.x = -40
    cameraPos.y = cameraPos.y * 1.6

    return { cameraPos, lookAtPosition }
  }
}

export default TomCameraPosition
