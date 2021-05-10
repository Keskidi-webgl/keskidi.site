import GlobalScene from "~/core/scene/GlobalScene";
import { Vector3 } from "three";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import { InteractionPoint } from "~/core/config/global-scene/interact-points/types";
import { Mezzanine } from "~/core/config/global-scene/rooms";

const MezzanineInteractPoint: InteractionPoint = {
  name: Mezzanine.urlSlug,

  nameForHuman: Mezzanine.nameForHuman,

  canvasCoords: () => {
    const position = new Vector3();
    GlobalScene.context.scene
      .getObjectByName("mezzanine")!
      .getWorldPosition(position);

    position.y = 1 + position.y + 80;
    position.x = 1 + position.x - 30;

    return position;
  },

  isCompleted: () => {
    return false;
  },

  isVisible(globalStore: GlobalStore, authStore: AuthStore): boolean {
    return authStore.isAuth;
  },

  url: () => Mezzanine.fullUrl,

  transformX: 0,

  transformY: 0
};

export default MezzanineInteractPoint;
