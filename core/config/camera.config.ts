import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {PresetCameraPosition} from "~/core/types";

class CameraConfig {
  public presetPositions: Array<PresetCameraPosition> = [
    {
      name: URL_ROOM_IDENTIFIER.MEZZANINE,
      coords() {
        const lookAtPosition = new Vector3()
        SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.getWorldPosition(lookAtPosition)
        const cameraPos = lookAtPosition.clone()
        cameraPos.y = cameraPos.y * 1.4
        cameraPos.x = cameraPos.x * 2
        cameraPos.z = cameraPos.z * 7

        return { cameraPos, lookAtPosition }
      }
    },
    {
      name: URL_ROOM_IDENTIFIER.LOUNGE,
      coords() {
        const lookAtPosition = new Vector3()
        SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.getWorldPosition(lookAtPosition)
        const cameraPos = lookAtPosition.clone()
        cameraPos.x = cameraPos.x * 1.7
        cameraPos.y = cameraPos.y * 1.3
        cameraPos.z = cameraPos.z * 13

        return { cameraPos, lookAtPosition }
      }
    },
    {
      name: URL_ROOM_IDENTIFIER.BEDROOM,
      coords() {
        const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
        const cameraPos = lookAtPosition.clone()
        cameraPos.x = cameraPos.x * 2
        cameraPos.y = cameraPos.y * 1.6
        cameraPos.z = cameraPos.z * 1.2

        return { cameraPos, lookAtPosition }
      }
    },
    {
      name: 'home',
      coords() {
        const lookAtPosition = SceneManager.GLOBAL_SCENE.scene.position
        const cameraPos =  lookAtPosition.clone()

        cameraPos.z = (cameraPos.z + 1) * 1000
        cameraPos.y = (cameraPos.y + 1) * 1000
        cameraPos.x = (cameraPos.x + 1) * 1000

        return { cameraPos, lookAtPosition }
      }
    }
  ]
}

const instance = new CameraConfig()

export default instance
