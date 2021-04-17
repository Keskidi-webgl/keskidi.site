import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {AxiosRequestConfig} from "axios";
import {ApiSuccessResponse} from "~/core/types";

/**
 * @description
 * This manager is a gateway to retrieve data from API
 *
 * @example
 * // Retrieve all medias from API
 * await ApiManager.request({ url: '/medias', method: 'GET' })
 */
class ApiManager {
  private $axios: NuxtAxiosInstance|null = null;

  public setAxios(axios: NuxtAxiosInstance) {
    this.$axios = axios
  }

  /**
   * Method to interact with API
   */
  public async request(config: AxiosRequestConfig): Promise<ApiSuccessResponse> {
    if (!this.$axios) {
      throw new Error('You need to set $axios (of type NuxtAxiosInstance) instance before request. Please use setter setAxios.')
    }
    const {data} = await this.$axios.request(config)

    return data as ApiSuccessResponse
  }
}

const instance = new ApiManager()

export default instance
