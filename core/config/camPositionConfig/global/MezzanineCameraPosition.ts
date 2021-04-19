import {PresetCameraPosition} from "~/core/types";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const MezzanineCameraPosition: PresetCameraPosition = {
  name: URL_ROOM_IDENTIFIER.MEZZANINE,

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tv')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = -500
    cameraPos.y = 400
    cameraPos.z = -90

    return { cameraPos, lookAtPosition }
  }
}

export default MezzanineCameraPosition
