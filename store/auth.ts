import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {LoginAuthCredential, RegisterAuthCredential} from "~/core/types";
import AuthManager from "~/core/managers/AuthManager";

// Doc : https://blog.logrocket.com/how-to-set-up-and-code-nuxt-js-apps-fully-in-typescript/
// Doc : https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs
// Doc : https://github.com/championswimmer/vuex-module-decorators/issues/116

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true,
})
export default class AuthModule extends VuexModule {
  private _token: string|null = null
  private _isAuth: boolean = false

  @Mutation
  setToken(token: string|null) {
    this._token = token
  }

  @Mutation
  setIsAuth(isAuth: boolean) {
    this._isAuth = isAuth
  }

  @Action({rawError: true})
  async login(credentials: LoginAuthCredential) {
    try {
      const authToken = await AuthManager.login(credentials)
      this.setToken(authToken)
      this.setIsAuth(true)
    } catch (error) {
      this.setToken(null)
      this.setIsAuth(false)
    }
  }

  @Action
  async register(credentials: RegisterAuthCredential) {
    try {
      const authToken = await AuthManager.register(credentials)
      this.setToken(authToken)
      this.setIsAuth(true)
    } catch (error) {
      this.setToken(null)
      this.setIsAuth(false)
    }
  }

  @Action
  logout() {
    console.log('logout')
    AuthManager.logout()
    this.setToken(null)
    this.setIsAuth(false)
  }

  get isAuth(): boolean {
    return this._isAuth
  }

  get token(): string|null {
    return this._token
  }
}
