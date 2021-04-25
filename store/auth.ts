import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {AuthCredential, AuthTokenPayloads, User} from "~/core/types";
import jwtDecode from "jwt-decode";
import {AuthManager} from "~/core/managers";

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

  @Action
  public async auth(credential: AuthCredential) {
    const token = await AuthManager.auth(credential);
    this.setToken(token)
  }

  @Mutation
  setToken(token: string|null) {
    this._token = token
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
