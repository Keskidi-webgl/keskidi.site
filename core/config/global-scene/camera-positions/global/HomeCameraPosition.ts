import GlobalScene from "~/core/scene/GlobalScene";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";

const  HomeCameraPosition: CameraPosition = {
  name: 'home',

  coords: () => {
    const lookAtPosition = GlobalScene.context.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = 1150
    cameraPos.y = 500
    cameraPos.x = -400

    return {cameraPos, lookAtPosition}
  }
}

export default HomeCameraPosition
