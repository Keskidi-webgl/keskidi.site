import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {ACTIVITY_TYPE} from "~/core/enums";
import {Word} from "~/core/types";


@Module({
  name: 'activity',
  namespaced: true,
  stateFactory: true,
})
export default class ActivityStore extends VuexModule {
  private _dataWord: Word | null = null
  private _currentActivity: ACTIVITY_TYPE | null = null

  @Mutation
  public setCurrentActivity(activity:ACTIVITY_TYPE | null) {
    this._currentActivity = activity
  }

  @Mutation
  public setDataWord(dataWord: Word | null) {
    this._dataWord = dataWord
  }

  get currentActivity() {
    return this._currentActivity
  }

  get dataWord() {
    return this._dataWord
  }

}
