import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {INTERACT_POINT_NAME, URL_ROOM_IDENTIFIER} from "~/core/enums";
import SceneConfig from "~/core/config/scene.config";
import RoomConfigElement from "~/core/config/roomConfig/RoomConfigElement";
import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";


@Module({
  name: 'scene',
  namespaced: true,
  stateFactory: true,
})
export default class SceneModule extends VuexModule {
  private _activeRoom: RoomConfigElement | null = null
  private _activeInteractionPoints: Array<InteractPointConfigElement> = []

  @Mutation
  public setActiveRoom(roomIdentifier: URL_ROOM_IDENTIFIER)
  {
    this._activeRoom = SceneConfig.getRoomConfig(roomIdentifier)
  }

  @Mutation
  public clearActiveRoom() {
    this._activeRoom = null
  }

  @Mutation
  public addInteractivePoint(name: INTERACT_POINT_NAME) {
    const point = SceneConfig.getInteractionPoint(name)
    if (point) {
      this._activeInteractionPoints.push(point)
    }

    return this
  }

  @Mutation
  public removeInteractivePoint(name: INTERACT_POINT_NAME) {
    this._activeInteractionPoints = this._activeInteractionPoints.filter(point => point.name !== name)

    return this
  }

  @Mutation
  public updatePositionsInteractivePoint(data: {name: INTERACT_POINT_NAME, transformX: number, transformY: number}) {
    const point = SceneConfig.getInteractionPoint(data.name)
    if (point) {
      point.transformX = data.transformX
      point.transformY = data.transformY
    }
  }

  get activeRoom() {
    return this._activeRoom
  }

  get activeInteractionPoints() {
    return this._activeInteractionPoints
  }
}
