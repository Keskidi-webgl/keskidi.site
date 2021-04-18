import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import SceneConfig from '~/core/config/scene.config'
import {Vector3} from "three";
import {MezzanineConfig} from "~/core/config/roomConfig";

class TelevisionInteractPointConfig extends InteractPointConfigElement {
  protected _name = INTERACT_POINT_NAME.TELEVISION

  protected _canvasCoords = () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('tv')!.getWorldPosition(position)

    return position
  }

  protected _isCompleted = (): boolean => {
    return false;
  }

  protected _url = MezzanineConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.TELEVISION

}

export default new TelevisionInteractPointConfig()
