import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Initializers} from "~/core/defs";
import {ApiManagerInitializer, AssetManagerInitializer, GlobalSceneInitializer} from "~/core/utils/initializers";

/**
 * @description
 * This initializer is a director for all sub initializers. It is responsible for initializing the app at the first
 * connexion of the user
 */
export default class AppInitializer extends Initializers<{ axios: NuxtAxiosInstance, canvas: HTMLCanvasElement }, Promise<void>> {
  async init(): Promise<void> {
    new ApiManagerInitializer({axios: this._data.axios}).init()
    await new AssetManagerInitializer(null).init()
    new GlobalSceneInitializer({canvas: this._data.canvas}).init()
  }

}
