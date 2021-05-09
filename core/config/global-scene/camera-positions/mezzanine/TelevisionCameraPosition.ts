import { Vector3 } from "three";
import { CameraPosition } from "~/core/config/global-scene/camera-positions/types";
import { TelevisionRoomObject } from "~/core/config/global-scene/room-objects";
import GlobalScene from "~/core/scene/GlobalScene";

const TelevisionCameraPosition: CameraPosition = {
  name: TelevisionRoomObject.urlSlug,

  coords: () => {
    const lookAtPosition = new Vector3();
    GlobalScene.context.scene
      .getObjectByName("tv")!
      .getWorldPosition(lookAtPosition);
    lookAtPosition.z = lookAtPosition.z * 0.7;
    lookAtPosition.y = lookAtPosition.y * 0.95;
    const cameraPos = lookAtPosition.clone();
    cameraPos.x = -180;

    return { cameraPos, lookAtPosition };
  }
};

export default TelevisionCameraPosition;
