import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {ACTIVITY_TYPE} from "~/core/enums";


@Module({
  name: 'activity',
  namespaced: true,
  stateFactory: true,
})
export default class ActivityModule extends VuexModule {
  // private _isAppInit: boolean = false
  private _dataWord:any
  private _currentActivity:ACTIVITY_TYPE | null = null

  @Mutation
  public setCurrentActivity(activity:ACTIVITY_TYPE){
    this._currentActivity = activity
  }

  get currentActivity(){
    return this._currentActivity
  }

}
