import CamPositionConfigElement from "~/core/config/presetCamPositionConfig/CamPositionConfigElement";
import {SceneManager} from "~/core/managers";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";

class BedroomCamPositionConfig extends CamPositionConfigElement {

  protected _name = URL_ROOM_IDENTIFIER.BEDROOM;

  protected _coords = () => {
    const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
    const cameraPos = lookAtPosition.clone()
    cameraPos.x = cameraPos.x * 2
    cameraPos.y = cameraPos.y * 1.6
    cameraPos.z = cameraPos.z * 1.2

    return { cameraPos, lookAtPosition }
  }

}

export default new BedroomCamPositionConfig()
