import CamPositionConfigElement from "~/core/config/presetCamPositionConfig/CamPositionConfigElement";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";

class LoungePosterCamPositionConfig extends CamPositionConfigElement {

  protected _name = URL_OBJECT_IDENTIFIER.LOUNGE_POSTER;

  protected _coords = () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tableau_big')!.getWorldPosition(lookAtPosition)
    lookAtPosition.z = lookAtPosition.z * 2

    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 1.05
    cameraPos.z = cameraPos.z * 0.2

    return { cameraPos, lookAtPosition }
  }

}

export default new LoungePosterCamPositionConfig()
