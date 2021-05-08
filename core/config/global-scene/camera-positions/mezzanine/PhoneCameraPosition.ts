import {Vector3} from "three";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {PhoneRoomObject, TelevisionRoomObject} from "~/core/config/global-scene/room-objects";
import GlobalScene from "~/core/scene/GlobalScene";

const PhoneCameraPosition: CameraPosition = {
  name: PhoneRoomObject.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    GlobalScene.context.scene.getObjectByName('phone')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.99
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 1.06
    cameraPos.y = cameraPos.y * 1.08
    cameraPos.z = cameraPos.z * 0.95

    return { cameraPos, lookAtPosition }
  }
}

export default PhoneCameraPosition
