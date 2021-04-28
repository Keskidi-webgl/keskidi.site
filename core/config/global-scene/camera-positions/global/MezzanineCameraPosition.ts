import {Vector3} from "three";
import {SceneManager} from "~/core/managers";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Mezzanine} from "~/core/config/global-scene/rooms";

const MezzanineCameraPosition: CameraPosition = {
  name: Mezzanine.urlSlug,

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
