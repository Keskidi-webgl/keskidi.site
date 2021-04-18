import CamPositionConfigElement from "~/core/config/presetCamPositionConfig/CamPositionConfigElement";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";

class MagazineCamPositionConfig extends CamPositionConfigElement {

  protected _name = URL_OBJECT_IDENTIFIER.MAGAZINE;

  protected _coords = () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('magazine')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 0.7

    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.3
    cameraPos.x = cameraPos.x * 1.05

    return { cameraPos, lookAtPosition }
  }

}

export default new MagazineCamPositionConfig()
