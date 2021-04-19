import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const TshirtCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.T_SHIRT,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tshirt')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.8

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.6
    cameraPos.x = cameraPos.x * 1.5

    return { cameraPos, lookAtPosition }
  }
}

export default TshirtCameraPosition
