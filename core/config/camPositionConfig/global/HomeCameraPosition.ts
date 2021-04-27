import {PresetCameraPosition} from "~/core/types";
import {SceneManager} from "~/core/managers";

const  HomeCameraPosition: PresetCameraPosition = {
  name: 'home',

  coords: () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = 1300
    cameraPos.y = 500
    cameraPos.x = -400

    return {cameraPos, lookAtPosition}
  }
}

export default HomeCameraPosition
