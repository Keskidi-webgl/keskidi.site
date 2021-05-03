import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Vector3} from "three";

const BedroomCameraPosition: CameraPosition = {
  name: 'cloud',

  coords: () => {
    const lookAtPosition = new Vector3(-100, 900, 10)
    //GlobalScene.context.scene.getObjectByName('cloud6')!.getWorldPosition(lookAtPosition)

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 0.9
    //cameraPos.x = cameraPos.x * 6
    cameraPos.z = 400

    return {cameraPos, lookAtPosition}
  }
}

export default BedroomCameraPosition
