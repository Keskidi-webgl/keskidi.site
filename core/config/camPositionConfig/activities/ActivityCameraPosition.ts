import {PresetCameraPosition} from "~/core/types";
import {SceneManager} from "~/core/managers";

const  ActivityCameraPosition: PresetCameraPosition = {
  name: 'activity',

  coords: () => {
    const lookAtPosition = SceneManager.ACTIVITY_SCENE.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = -30
    cameraPos.y = 0
    cameraPos.x = 0

    return {cameraPos, lookAtPosition}
  }
}

export default ActivityCameraPosition
