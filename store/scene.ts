import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import SceneConfig from "~/core/config/scene.config";
import {InteractionPointConfig, RoomConfig} from "~/core/types";


@Module({
  name: 'scene',
  namespaced: true,
  stateFactory: true,
})
export default class SceneModule extends VuexModule {
  private _activeRoom: RoomConfig | null = null
  private _activeObject: URL_OBJECT_IDENTIFIER | null = null
  private _activeInteractionPoints: Array<InteractionPointConfig> = []

  @Mutation
  public setActiveRoom(roomIdentifier: URL_ROOM_IDENTIFIER)
  {
    this._activeRoom = SceneConfig.getRoomConfig(roomIdentifier)
  }

  @Mutation
  public setActiveObject(objectIdentifier: URL_OBJECT_IDENTIFIER | null)
  {
    this._activeObject = objectIdentifier
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

  get activeObject() {
    return this._activeObject
  }
}
