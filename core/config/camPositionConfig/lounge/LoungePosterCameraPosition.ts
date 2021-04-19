import {PresetCameraPosition} from "~/core/types";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {Vector3} from "three";
import {SceneManager} from "~/core/managers";

const LoungePosterCameraPosition: PresetCameraPosition = {
  name: URL_OBJECT_IDENTIFIER.LOUNGE_POSTER,

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tableau_big')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 1.15

    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 10
    cameraPos.z = cameraPos.z * 0.9

    return { cameraPos, lookAtPosition }
  }
}

export default LoungePosterCameraPosition
