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
  private _dataWord: Array<Word> | null = null;

  @Mutation
  public setIsAppInit(isInit: boolean) {
    this._isAppInit = isInit;
  }

  @Mutation
  public setUserWordData(userWordData: Array<UserWordData>) {
    this._userWordData = userWordData;
  }

  @Mutation
  public setDataWord(dataWord: Array<Word> | null) {
    this._dataWord = dataWord;
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
}
