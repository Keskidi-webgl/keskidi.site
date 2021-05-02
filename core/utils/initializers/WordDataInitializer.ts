import {ApiManager} from "~/core/managers";
import {Initializers} from "~/core/defs";
import GlobalStore from "~/store/global";

/**
 * @description
 * This initializer is responsible for retrieve all data word and store it in global store
 */
export default class ApiManagerInitializer extends Initializers<{ globalStore: GlobalStore }, void> {

  public async init(): Promise<void> {
    const {data} = await ApiManager.request({
      url: '/words?with=expressions,definition,homeScenario,activityData,definition.medias',
      method: 'GET'
    })
    this._data.globalStore.setDataWord(data)
  }
}
