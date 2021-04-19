import {PresetCameraPosition} from "~/core/types";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const MezzanineCameraPosition: PresetCameraPosition = {
  name: URL_ROOM_IDENTIFIER.MEZZANINE,

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.4
    cameraPos.x = cameraPos.x * 2
    cameraPos.z = cameraPos.z * 7

    return { cameraPos, lookAtPosition }
  }
}

export default MezzanineCameraPosition
