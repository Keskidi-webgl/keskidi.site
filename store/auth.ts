import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {AuthTokenPayloads, LoginAuthCredential, RegisterAuthCredential, User} from "~/core/types";
import AuthManager from "~/core/managers/AuthManager";
import jwtDecode from "jwt-decode";

// Doc : https://blog.logrocket.com/how-to-set-up-and-code-nuxt-js-apps-fully-in-typescript/
// Doc : https://github.com/championswimmer/vuex-module-decorators#accessing-modules-with-nuxtjs
// Doc : https://github.com/championswimmer/vuex-module-decorators/issues/116

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true,
})
export default class AuthModule extends VuexModule {
  private _token: string|null = AuthManager.getAuthToken()

  @Mutation
  setToken(token: string|null) {
    this._token = token
  }

  @Action({rawError: true})
  async login(credentials: LoginAuthCredential) {
    try {
      const authToken = await AuthManager.login(credentials)
      this.setToken(authToken)
    } catch (error) {
      this.setToken(null)
    }
  }

  @Action
  async register(credentials: RegisterAuthCredential) {
    try {
      const authToken = await AuthManager.register(credentials)
      this.setToken(authToken)
    } catch (error) {
      console.log(error)
    }
  }

  @Action
  logout() {
    AuthManager.logout()
    this.setToken(null)
  }

  get isAuth(): boolean {
    return !!this._token
  }

  get token(): string | null {
    return this._token
  }

  get user(): User | null {
    let user: User | null = null

    if (this.isAuth) {
      const payloads: AuthTokenPayloads = jwtDecode(this._token!)
      user = {id: parseInt(payloads.sub)}
    }

    return user
  }
}
