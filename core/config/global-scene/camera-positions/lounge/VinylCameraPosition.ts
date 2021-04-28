import {Vector3} from "three";
import {SceneManager} from "~/core/managers";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {VinylRoomObject} from "~/core/config/global-scene/room-objects";

const VinylCameraPosition: CameraPosition = {
  name: VinylRoomObject.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('vinyles')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 1.05

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.1
    cameraPos.x = cameraPos.x * 6
    cameraPos.z = cameraPos.z * 1.1

    return { cameraPos, lookAtPosition }
  }
}

export default VinylCameraPosition
