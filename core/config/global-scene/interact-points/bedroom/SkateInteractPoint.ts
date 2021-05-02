import { URL_OBJECT_IDENTIFIER } from "~/core/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import { Vector3 } from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import { InteractionPoint } from "~/core/config/global-scene/interact-points/types";
import { SkateRoomObject } from "~/core/config/global-scene/room-objects";

const SkateInteractPoint: InteractionPoint = {
  name: SkateRoomObject.urlSlug,

  nameForHuman: SkateRoomObject.nameForHuman,

  canvasCoords: () => {
    const position = new Vector3();
    GlobalScene.context.scene
      .getObjectByName("skate")!
      .getWorldPosition(position);

    return position;
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => SkateRoomObject.fullUrl,

  transformX: 0,

  transformY: 0
};

export default SkateInteractPoint;
