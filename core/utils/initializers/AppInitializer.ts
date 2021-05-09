import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Initializers} from "~/core/defs";
import {
  ApiManagerInitializer,
  GlobalSceneInitializer,
  TomSceneElementInitializer,
  WordDataInitializer
} from "~/core/utils/initializers";
import GlobalSceneStore from "~/store/globalScene";
import GlobalStore from "~/store/global";

/**
 * @description
 * This initializer is a director for all sub initializers. It is responsible for initializing the app at the first
 * connexion of the user
 */
export default class AppInitializer extends Initializers<{ axios: NuxtAxiosInstance, canvas: HTMLCanvasElement, globalSceneStore: GlobalSceneStore, globalStore: GlobalStore }, Promise<void>> {
  async init(): Promise<void> {
    new ApiManagerInitializer({axios: this._data.axios}).init()
    new TomSceneElementInitializer(null).init()
    new GlobalSceneInitializer({canvas: this._data.canvas, globalSceneStore: this._data.globalSceneStore}).init()
    await new WordDataInitializer({globalStore: this._data.globalStore}).init()
  }

}
