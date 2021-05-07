import GlobalScene from "~/core/scene/GlobalScene";
import {Vector3} from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {NotebookRoomObject, VinylRoomObject} from "~/core/config/global-scene/room-objects";

const VinylInteractPoint: InteractionPoint = {
  name: NotebookRoomObject.urlSlug,

  nameForHuman: NotebookRoomObject.nameForHuman,

  canvasCoords: () => {
    const position = new Vector3();
    GlobalScene.context.scene
      .getObjectByName("notebook")!
      .getWorldPosition(position);

    return position;
  },

  isCompleted: (globalStore: GlobalStore) => {
    return globalStore.userWordData!.some(
      word => word.id === NotebookRoomObject.wordId && word.is_achieved
    );
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => NotebookRoomObject.fullUrl,

  transformX: 0,

  transformY: 0
};

export default VinylInteractPoint;
