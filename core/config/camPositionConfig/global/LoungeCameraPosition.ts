import {PresetCameraPosition} from "~/core/types";
import {SceneManager} from "~/core/managers";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";

const LoungeCameraPosition: PresetCameraPosition = {
  name: URL_ROOM_IDENTIFIER.LOUNGE,

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 1.7
    cameraPos.y = cameraPos.y * 1.3
    cameraPos.z = cameraPos.z * 13

    return { cameraPos, lookAtPosition }
  }
}

export default LoungeCameraPosition
