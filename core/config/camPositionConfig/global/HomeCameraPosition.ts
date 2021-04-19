import {PresetCameraPosition} from "~/core/types";
import {SceneManager} from "~/core/managers";

const  HomeCameraPosition: PresetCameraPosition = {
  name: 'home',

  coords: () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = 750
    cameraPos.y = 800
    cameraPos.x = -500

    return {cameraPos, lookAtPosition}
  }
}

export default HomeCameraPosition
