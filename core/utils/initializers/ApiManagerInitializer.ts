import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {ApiManager} from "~/core/managers";
import {Initializers} from "~/core/defs";

/**
 * @description
 * This initializer is responsible for initialize ApiManager
 */
export default class ApiManagerInitializer extends Initializers<{ axios: NuxtAxiosInstance }, void> {

  public init(): void {
    ApiManager.setAxios(this._data.axios)
  }
}
