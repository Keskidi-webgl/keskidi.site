import {Vector3} from "three";
import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {VinylRoomObject} from "~/core/config/global-scene/room-objects";

const VinylCameraPosition: CameraPosition = {
  name: VinylRoomObject.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    GlobalScene.context.scene.getObjectByName('vinyles')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 1.05

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.1
    cameraPos.x = cameraPos.x * 3

    return { cameraPos, lookAtPosition }
  }
}

export default VinylCameraPosition
