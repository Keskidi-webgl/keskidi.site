import {AuthCredential, LoginAuthCredential, RegisterAuthCredential} from "~/core/types";
import {AxiosRequestConfig} from "axios";
import {ApiManager} from "~/core/managers";

/**
 * @description
 * This manager is responsible for handle login logic
 *
 * @example
 * // Login a user
 * await AuthManager.login({ email: toto@mail.com })
 */
class AuthManager {
  public static AUTH_TOKEN_KEY_STORAGE = 'authToken'

  /**
   * Auth the user (register if email doesn't exist or login)
   * @param credential
   */
  public async auth(credential: AuthCredential): Promise<string> {
    const payloads: AxiosRequestConfig = {
      url: '/auth',
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
