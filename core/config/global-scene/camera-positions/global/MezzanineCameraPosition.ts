import {Vector3} from "three";
import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Mezzanine} from "~/core/config/global-scene/rooms";

const MezzanineCameraPosition: CameraPosition = {
  name: Mezzanine.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    GlobalScene.context.scene.getObjectByName('tv')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = -480
    cameraPos.y = 380
    cameraPos.z = 100

    return { cameraPos, lookAtPosition }
  }
}

export default MezzanineCameraPosition
