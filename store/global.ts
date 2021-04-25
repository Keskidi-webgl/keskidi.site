import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {UserWordData} from "~/core/types";


@Module({
  name: 'global',
  namespaced: true,
  stateFactory: true,
})
export default class GlobalModule extends VuexModule {
  private _isAppInit: boolean = false
  private _userWordData: Array<UserWordData> | null = null

  @Mutation
  public setIsAppInit(isInit: boolean)
  {
    this._isAppInit = isInit
  }

  @Mutation
  public setUserWordData(userWordData: Array<UserWordData>)
  {
    this._userWordData = userWordData
  }

  get isAppInit()
  {
    return this._isAppInit
  }

  get userWordData()
  {
    return this._userWordData
  }
}
