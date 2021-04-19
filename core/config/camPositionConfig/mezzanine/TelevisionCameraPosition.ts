import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const TelevisionCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.TELEVISION,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tv')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.8
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 27
    cameraPos.y = cameraPos.y * 1.1

    return { cameraPos, lookAtPosition }
  }
}

export default TelevisionCameraPosition
