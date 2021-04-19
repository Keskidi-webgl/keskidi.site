import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const SkateCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.SKATE,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('skate')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.8

    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 6.5

    return { cameraPos, lookAtPosition }
  }
}

export default SkateCameraPosition
