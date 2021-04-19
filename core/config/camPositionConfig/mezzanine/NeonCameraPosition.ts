import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const NeonCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.NEON,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('neon_just_chill')!.getWorldPosition(lookAtPosition)
    lookAtPosition.x = lookAtPosition.x * 0.8
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 1.3
    cameraPos.z = cameraPos.z * 0.2

    return { cameraPos, lookAtPosition }
  }
}

export default NeonCameraPosition
