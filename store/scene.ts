import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {RoomConfigElement} from "~/core/types";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import SceneConfig from "~/core/config/scene.config";


@Module({
  name: 'scene',
  namespaced: true,
  stateFactory: true,
})
export default class SceneModule extends VuexModule {
  private _activeRoom: RoomConfigElement | null = null

  @Mutation
  public setActiveRoom(roomIdentifier: URL_ROOM_IDENTIFIER)
  {
    this._activeRoom = SceneConfig.getRoomConfig(roomIdentifier)
    console.log(this._activeRoom)
  }

  @Mutation
  public clearActiveRoom() {
    this._activeRoom = null
  }

  get activeRoom() {
    return this._activeRoom
  }
}
