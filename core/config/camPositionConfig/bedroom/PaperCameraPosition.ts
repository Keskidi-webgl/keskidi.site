import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const PaperCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.PAPER,
  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('papier_anim')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    return { cameraPos, lookAtPosition }
  }
}

export default PaperCameraPosition
