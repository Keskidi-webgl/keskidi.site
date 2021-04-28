import {INTERACT_POINT_NAME} from "~/core/enums";
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";
import {Vector3} from "three";

export type InteractionPoint = {
  name: string
  isCompleted: (globalModule: GlobalModule) => boolean
  isVisible: (globalModule: GlobalModule, authModule: AuthModule) => boolean
  canvasCoords: () => Vector3
  transformX: number
  transformY: number
  url: string
}
