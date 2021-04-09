import {VuexModule} from "vuex-module-decorators";

export default class AuthModule extends VuexModule {
  public token: string = ''
  public isAuth: boolean = false

}
