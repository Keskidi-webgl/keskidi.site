import {Module, Mutation, VuexModule} from "vuex-module-decorators";


@Module({
  name: 'global',
  namespaced: true,
  stateFactory: true,
})
export default class GlobalModule extends VuexModule {
  private _isAppInit: boolean = false

  @Mutation
  public setIsAppInit(isInit: boolean)
  {
    this._isAppInit = isInit
  }

  get isAppInit()
  {
    return this._isAppInit
  }
}
