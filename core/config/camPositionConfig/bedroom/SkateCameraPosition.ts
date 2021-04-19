import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const SkateCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.SKATE,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('skate')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    return { cameraPos, lookAtPosition }
  }
}

export default SkateCameraPosition
