import ApiManager from "~/core/managers/ApiManager";
import {LoginAuthCredential, RegisterAuthCredential} from "~/core/types";
import {AxiosRequestConfig} from "axios";

class AuthManager {
  public static AUTH_TOKEN_KEY_STORAGE = 'authToken'

  /**
   * Intent login request to the API
   */
  public async login(credential: LoginAuthCredential): Promise<string> {
    console.log('async')
    const payloads: AxiosRequestConfig = {
      url: '/login',
      method: 'POST',
      data: credential
    }
    console.log(payloads)
    const {data} = await ApiManager.request(payloads)
    this.storeAuthToken(data.token)

    return data.token
  }

  /**
   * Intent register request to the API
   */
  public async register(credential: RegisterAuthCredential): Promise<string> {
    const payloads: AxiosRequestConfig = {
      url: '/register',
      method: 'POST',
      data: credential
    }

    const {data} = await ApiManager.request(payloads)
    this.storeAuthToken(data.token)

    return data.token
  }

  /**
   * Logout user
   */
  public logout(): void {
    localStorage.removeItem(AuthManager.AUTH_TOKEN_KEY_STORAGE)
  }

  /**
   * Retrieve token auth token from local storage
   */
  public getAuthToken(): string|null {
    return localStorage.getItem(AuthManager.AUTH_TOKEN_KEY_STORAGE)
  }

  /**
   * Store auth token into local storage
   */
  public storeAuthToken(token: string): void {
    localStorage.setItem(AuthManager.AUTH_TOKEN_KEY_STORAGE, token)
  }
}

const instance = new AuthManager()

export default instance;
