import {Vector3} from "three";
import {SceneManager} from "~/core/managers";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {SkateRoomObject} from "~/core/config/global-scene/room-objects";

const SkateCameraPosition: CameraPosition = {
  name: SkateRoomObject.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('skate')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.8

    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 6.5

    return {cameraPos, lookAtPosition}
  }
}

export default SkateCameraPosition
