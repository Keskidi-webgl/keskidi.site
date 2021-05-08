import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { UserWordData, Word } from "~/core/types";

@Module({
  name: "global",
  namespaced: true,
  stateFactory: true
})
export default class GlobalStore extends VuexModule {
  private _isAppInit: boolean = false;
  private _userWordData: Array<UserWordData> | null = null;
  private _dataWord: Array<Word> = [];
  private _userAudioPreferences: string = localStorage.getItem("isSoundEnabled") || 'true'
  private _isMicrophoneActive: boolean = false

  @Mutation
  public setIsAppInit(isInit: boolean) {
    this._isAppInit = isInit;
  }

  @Mutation
  public setUserWordData(userWordData: Array<UserWordData>) {
    this._userWordData = userWordData;
  }

  @Mutation
  public setDataWord(dataWord: Array<Word>) {
    this._dataWord = dataWord;
  }

  @Mutation
  // How to use ?
  // this.globalStore.setUserAudioPreferences(false)
  public setUserAudioPreferences(soundPreference: boolean) {
    const preference = soundPreference ? "true" : "false"
    localStorage.setItem("isSoundEnabled", preference)
    this._userAudioPreferences = preference
  }

  @Mutation
  public setMicrophonePermission(micPermission: boolean) {
    this._isMicrophoneActive = micPermission

    return this
  }

  // methode to get all isachieved return nb en prenant toujouts 1 seul paramètre ou un objet
  get achievedWords() {
    return this._userWordData ? this._userWordData.filter(word => word.is_achieved == true) : [];
  }

  get isAppInit() {
    return this._isAppInit;
  }

  get userWordData() {
    return this._userWordData;
  }

  get dataWord() {
    return this._dataWord;
  }

  get microphonePermission(){
    return this._isMicrophoneActive
  }

  get isSoundEnabled() {
    return this._userAudioPreferences === "true"
  }
}
