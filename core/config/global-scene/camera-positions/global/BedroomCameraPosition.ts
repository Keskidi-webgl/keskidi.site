import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Bedroom} from "~/core/config/global-scene/rooms";

const BedroomCameraPosition: CameraPosition = {
  name: Bedroom.urlSlug,

  coords: () => {
    const lookAtPosition = GlobalScene.context.scene.getObjectByName('chambre')!.position
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = 250
    cameraPos.y = 130
    cameraPos.z = 500

    return { cameraPos, lookAtPosition }
  }
}

export default BedroomCameraPosition
