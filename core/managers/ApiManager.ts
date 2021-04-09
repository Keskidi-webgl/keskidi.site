import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {AxiosRequestConfig} from "axios";
import {ApiSuccessResponse} from "~/core/types";

export default class ApiManager {
  private $axios: NuxtAxiosInstance;

  constructor(axios: NuxtAxiosInstance) {
    this.$axios = axios
  }

  /**
   * Method to interact with API
   */
  public async request(config: AxiosRequestConfig): Promise<ApiSuccessResponse> {
    const {data} = await this.$axios.request(config)

    return data as ApiSuccessResponse
  }
}
