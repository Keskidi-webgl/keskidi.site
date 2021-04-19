import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const TshirtCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.T_SHIRT,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tshirt')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    return { cameraPos, lookAtPosition }
  }
}

export default TshirtCameraPosition
