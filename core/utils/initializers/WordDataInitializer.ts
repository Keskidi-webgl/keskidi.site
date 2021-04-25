import {ApiManager} from "~/core/managers";
import {Initializers} from "~/core/defs";
import GlobalModule from "~/store/global";

/**
 * @description
 * This initializer is responsible for retrieve all data word and store it in global store
 */
export default class ApiManagerInitializer extends Initializers<{ globalModule: GlobalModule }, void> {

  public async init(): Promise<void> {
    const {data} = await ApiManager.request({
      url: '/words?with=expressions,definition,homeScenario,activityData,definition.medias',
      method: 'GET'
    })
    this._data.globalModule.setDataWord(data)
  }
}
