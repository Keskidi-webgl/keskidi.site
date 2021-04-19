import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const MagazineCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.MAGAZINE,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('magazine')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.7

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.3
    cameraPos.x = cameraPos.x * 1.05

    return { cameraPos, lookAtPosition }
  }
}

export default MagazineCameraPosition
