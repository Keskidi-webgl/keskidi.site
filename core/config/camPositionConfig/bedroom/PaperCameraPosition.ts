import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const PaperCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.PAPER,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('papier_anim')!.getWorldPosition(lookAtPosition)
    lookAtPosition.x = lookAtPosition.x * 1.15

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 3

    return { cameraPos, lookAtPosition }
  }
}

export default PaperCameraPosition
