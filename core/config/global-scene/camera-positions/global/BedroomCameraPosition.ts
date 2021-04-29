import {SceneManager} from "~/core/managers";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {Bedroom} from "~/core/config/global-scene/rooms";

const BedroomCameraPosition: CameraPosition = {
  name: Bedroom.urlSlug,

  coords: () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = 250
    cameraPos.y = 130
    cameraPos.z = 500

    return { cameraPos, lookAtPosition }
  }
}

export default BedroomCameraPosition