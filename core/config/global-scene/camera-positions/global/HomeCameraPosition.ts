import {SceneManager} from "~/core/managers";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";

const  HomeCameraPosition: CameraPosition = {
  name: 'home',

  coords: () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = 1300
    cameraPos.y = 500
    cameraPos.x = -500

    return {cameraPos, lookAtPosition}
  }
}

export default HomeCameraPosition
