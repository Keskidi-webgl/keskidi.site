import {PresetCameraPosition} from "~/core/types";
import {SceneManager} from "~/core/managers";

const  Activity1Object: PresetCameraPosition = {
  name: 'activity1object',

  coords: () => {
    const lookAtPosition = SceneManager.ACTIVITY_1_OBJECTS.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = -30
    cameraPos.y = 0
    cameraPos.x = 0

    return {cameraPos, lookAtPosition}
  }
}

export default Activity1Object
