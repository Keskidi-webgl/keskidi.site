import GlobalScene from "~/core/scene/GlobalScene";
import { Vector3 } from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import { InteractionPoint } from "~/core/config/global-scene/interact-points/types";
import {
  PhoneRoomObject,
  VinylRoomObject
} from "~/core/config/global-scene/room-objects";

const PhoneInteractPoint: InteractionPoint = {
  name: PhoneRoomObject.urlSlug,

  nameForHuman: PhoneRoomObject.nameForHuman,

  canvasCoords: () => {
    const position = new Vector3();
    GlobalScene.context.scene
      .getObjectByName("phone")!
      .getWorldPosition(position);

    position.y = 1 + position.y + 40;
    position.x = 1 + position.x - 40;

    return position;
  },

  isCompleted: globalStore => {
    return globalStore.userWordData!.some(
      word => word.id === PhoneRoomObject.wordId && word.is_achieved
    );
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => PhoneRoomObject.fullUrl,

  transformX: 0,

  transformY: 0
};

export default PhoneInteractPoint;
