import {Vector3} from "three";
import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {NotebookRoomObject} from "~/core/config/global-scene/room-objects";

const NotebookCameraPosition: CameraPosition = {
  name: NotebookRoomObject.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3()
    GlobalScene.context.scene.getObjectByName('notebook')!.getWorldPosition(lookAtPosition)
    lookAtPosition.x = lookAtPosition.x * 0.9
    lookAtPosition.z = lookAtPosition.z * 1.05

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.6
    cameraPos.x = cameraPos.x * 1.1
    cameraPos.z = cameraPos.z * 1.1

    return {cameraPos, lookAtPosition}
  }
}

export default NotebookCameraPosition
