import {PresetCameraPosition} from "~/core/types";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const TomCameraPosition: PresetCameraPosition = {
  name: 'tom',
  coords: () => {
    const lookAtPosition = new Vector3()

    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tom')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.88
    lookAtPosition.y = lookAtPosition.y * 4

    const cameraPos = lookAtPosition.clone()
    //cameraPos.x = -100
    cameraPos.z = cameraPos.z * 1.25
    cameraPos.x = -100
    cameraPos.y = cameraPos.y * 1.6

    return { cameraPos, lookAtPosition }
  }
}

export default TomCameraPosition
