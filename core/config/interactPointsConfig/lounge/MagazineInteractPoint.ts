import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";
import {LoungeConfig} from "~/core/config/roomConfig";
import {InteractionPointConfig} from "~/core/types";
import {WORD_ID} from "~/core/enums/word";
import Helpers from "~/core/utils/helpers";
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";

const MagazineInteractPoint: InteractionPointConfig = {
  name: INTERACT_POINT_NAME.MAGAZINE,

  canvasCoords: () => {
    const position = new Vector3()
    SceneManager.GLOBAL_SCENE.scene.getObjectByName('magazine')!.getWorldPosition(position)

    return position
  },

  isCompleted: (globalModule) => {
    return globalModule.userWordData!.some(word => word.id === Helpers.wordIdFromObject(URL_OBJECT_IDENTIFIER.MAGAZINE) && word.is_achieved)
  },

  isVisible(globalModule: GlobalModule, authModule: AuthModule): boolean {
    return true;
  },

  url: LoungeConfig.fullUrl + '/' + URL_OBJECT_IDENTIFIER.MAGAZINE,

  transformX: 0,

  transformY: 0
}

export default MagazineInteractPoint
