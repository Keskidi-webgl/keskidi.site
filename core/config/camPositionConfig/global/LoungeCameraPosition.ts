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

    cameraPos.x = -400
    cameraPos.y = 130
    cameraPos.z = 300

    return { cameraPos, lookAtPosition }
  }
}

export default LoungeCameraPosition
