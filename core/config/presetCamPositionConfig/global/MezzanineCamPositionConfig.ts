import CamPositionConfigElement from "~/core/config/presetCamPositionConfig/CamPositionConfigElement";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";

class MezzanineCamPositionConfig extends CamPositionConfigElement {

  protected _name = URL_ROOM_IDENTIFIER.MEZZANINE;

  protected _coords = () => {
    const lookAtPosition = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.getWorldPosition(lookAtPosition)
    const cameraPos = lookAtPosition.clone()
    cameraPos.y = cameraPos.y * 1.4
    cameraPos.x = cameraPos.x * 2
    cameraPos.z = cameraPos.z * 7

    return { cameraPos, lookAtPosition }
  }

}

export default new MezzanineCamPositionConfig()
