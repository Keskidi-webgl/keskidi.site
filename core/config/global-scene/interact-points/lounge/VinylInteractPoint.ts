import { URL_OBJECT_IDENTIFIER } from "~/core/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import { Vector3 } from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import Helpers from "~/core/utils/helpers";
import { InteractionPoint } from "~/core/config/global-scene/interact-points/types";
import { VinylRoomObject } from "~/core/config/global-scene/room-objects";

const VinylInteractPoint: InteractionPoint = {
  name: VinylRoomObject.urlSlug,

  nameForHuman: VinylRoomObject.nameForHuman,

  canvasCoords: () => {
    const position = new Vector3();
    GlobalScene.context.scene
      .getObjectByName("vinyles")!
      .getWorldPosition(position);

    return position;
  },

  isCompleted: (globalStore: GlobalStore) => {
    return globalStore.userWordData!.some(
      word => word.id === VinylRoomObject.wordId && word.is_achieved
    );
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => VinylRoomObject.fullUrl,

  transformX: 0,

  transformY: 0
};

export default VinylInteractPoint;
