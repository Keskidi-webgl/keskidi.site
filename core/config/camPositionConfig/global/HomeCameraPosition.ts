import {PresetCameraPosition} from "~/core/types";
import {SceneManager} from "~/core/managers";

const  HomeCameraPosition: PresetCameraPosition = {
  name: 'home',

  coords: () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = 1000
    cameraPos.y = 1000
    cameraPos.x = -1000

    return {cameraPos, lookAtPosition}
  }
}

export default HomeCameraPosition
