import { URL_OBJECT_IDENTIFIER } from "~/core/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import { Vector3 } from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import { InteractionPoint } from "~/core/config/global-scene/interact-points/types";
import {
  NotebookRoomObject,
  PaperRoomObject
} from "~/core/config/global-scene/room-objects";

const PaperInteractPoint: InteractionPoint = {
  name: PaperRoomObject.urlSlug,

  nameForHuman: PaperRoomObject.nameForHuman,

  canvasCoords: () => {
    const position = new Vector3();
    GlobalScene.context.scene
      .getObjectByName("paper")!
      .getWorldPosition(position);

    position.x = 1 + position.x - 40;

    return position;
  },

  isCompleted: (globalStore: GlobalStore) => {
    return globalStore.userWordData!.some(
      word => word.id === PaperRoomObject.wordId && word.is_achieved
    );
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return true;
  },

  url: () => PaperRoomObject.fullUrl,

  transformX: 0,

  transformY: 0
};

export default PaperInteractPoint;
