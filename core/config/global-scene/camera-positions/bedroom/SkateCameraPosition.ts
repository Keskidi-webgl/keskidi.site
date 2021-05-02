import {Vector3} from "three";
import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {SkateRoomObject} from "~/core/config/global-scene/room-objects";

const SkateCameraPosition: CameraPosition = {
  name: SkateRoomObject.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    GlobalScene.context.scene.getObjectByName('skate')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.8

    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 6.5

    return {cameraPos, lookAtPosition}
  }
}

export default SkateCameraPosition
