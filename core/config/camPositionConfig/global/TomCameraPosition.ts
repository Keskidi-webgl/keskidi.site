import {PresetCameraPosition} from "~/core/types";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const TomCameraPosition: PresetCameraPosition = {
  name: 'tom',
  coords: () => {
    const lookAtPosition = new Vector3()

    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tom')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.95
    lookAtPosition.y = lookAtPosition.y * 4

    const cameraPos = lookAtPosition.clone()
    cameraPos.x = -50

    return { cameraPos, lookAtPosition }
  }
}

export default TomCameraPosition
