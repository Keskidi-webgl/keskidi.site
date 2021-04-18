import CamPositionConfigElement from "~/core/config/presetCamPositionConfig/CamPositionConfigElement";
import {SceneManager} from "~/core/managers";

class HomeCamPositionConfig extends CamPositionConfigElement {

  protected _name = 'home';

  protected _coords = () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.position
    const cameraPos = lookAtPosition.clone()

    cameraPos.z = (cameraPos.z + 1) * 1000
    cameraPos.y = (cameraPos.y + 1) * 1000
    cameraPos.x = (cameraPos.x + 1) * 1000

    return {cameraPos, lookAtPosition}
  }

}

export default new HomeCamPositionConfig()
