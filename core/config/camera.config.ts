import {PresetCameraPositionConfig} from "~/core/types";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";

class CameraConfig {
  public presetPositions: Array<PresetCameraPositionConfig> = [
    {
      name: URL_ROOM_IDENTIFIER.MEZZANINE,
      coords() {
        return SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.position
      }
    },
    {
      name: URL_ROOM_IDENTIFIER.LOUNGE,
      coords() {
        return SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.position
      }
    },
    {
      name: URL_ROOM_IDENTIFIER.BEDROOM,
      coords() {
        return SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
      }
    },
    {
      name: 'home',
      coords() {
        return new Vector3(1000, 1000, 1000)
      }
    }
  ]
}

const instance = new CameraConfig()

export default instance
