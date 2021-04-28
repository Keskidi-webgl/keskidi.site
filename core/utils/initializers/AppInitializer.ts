import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {Initializers} from "~/core/defs";
import {
  ApiManagerInitializer,
  AssetManagerInitializer,
  GlobalSceneInitializer,
   WordDataInitializer
} from "~/core/utils/initializers";
import SceneModule from "~/store/scene";
import GlobalModule from "~/store/global";

/**
 * @description
 * This initializer is a director for all sub initializers. It is responsible for initializing the app at the first
 * connexion of the user
 */
export default class AppInitializer extends Initializers<
  { axios: NuxtAxiosInstance, canvas: HTMLCanvasElement, sceneModule: SceneModule, globalModule: GlobalModule }, Promise<void>
  > {
  async init(): Promise<void> {
    new ApiManagerInitializer({axios: this._data.axios}).init()
    new GlobalSceneInitializer({canvas: this._data.canvas, sceneModule: this._data.sceneModule}).init()
    await new WordDataInitializer({globalModule: this._data.globalModule}).init()
  }

}
