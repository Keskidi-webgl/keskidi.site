import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import {Vector3} from "three";

export type InteractionPoint = {
  name: string
  isCompleted: (globalStore: GlobalStore) => boolean
  isVisible: (globalStore: GlobalStore, authStore: AuthStore) => boolean
  canvasCoords: () => Vector3
  transformX: number
  transformY: number
  url: () => string
}
