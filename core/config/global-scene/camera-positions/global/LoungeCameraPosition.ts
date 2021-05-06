import GlobalScene from "~/core/scene/GlobalScene";
import {Vector3} from "three";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Lounge} from "~/core/config/global-scene/rooms";

const LoungeCameraPosition: CameraPosition = {
  name: Lounge.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    GlobalScene.context.scene.getObjectByName('salon')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()

    cameraPos.x = -500
    cameraPos.y = 200
    cameraPos.z = 360

    return { cameraPos, lookAtPosition }
  }
}

export default LoungeCameraPosition
