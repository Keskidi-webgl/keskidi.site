import {PresetCameraPosition} from "~/core/types";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";

const BedroomCameraPosition: PresetCameraPosition = {
  name: URL_ROOM_IDENTIFIER.BEDROOM,

  coords: () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 2
    cameraPos.y = cameraPos.y * 1.6
    cameraPos.z = cameraPos.z * 1.2

    return { cameraPos, lookAtPosition }
  }
}

export default BedroomCameraPosition
