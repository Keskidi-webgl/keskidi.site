import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {Room} from "~/core/config/global-scene/rooms/types";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import GlobalSceneHelper from "~/core/config/global-scene/GlobalSceneHelper";
import {RoomObject} from "~/core/config/global-scene/room-objects/types";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";


@Module({
  name: 'scene',
  namespaced: true,
  stateFactory: true,
})
/**
 * Store state of global scene
 */
export default class GlobalSceneStore extends VuexModule {
  /**
   * Active room viewed on the global scene
   */
  private _activeRoom: Room | null = null
  /**
   * Active object viewed on the global scene
   */
  private _activeObject: RoomObject | null = null
  /**
   * Interaction points display on the global scene
   */
  private _activeInteractionPoints: Array<InteractionPoint> = []

  @Mutation
  public setActiveRoom(roomSlug: ROOM_SLUG | null) {
    this._activeRoom = roomSlug ? GlobalSceneHelper.getRoomBySlug(roomSlug) : roomSlug
  }

  @Mutation
  public setActiveObject(roomObjectSlug: ROOM_OBJECT_SLUG| null) {
    this._activeObject = roomObjectSlug ? GlobalSceneHelper.getRoomObjectBySlug(roomObjectSlug) : roomObjectSlug
  }

  @Mutation
  public clearActiveRoom() {
    this._activeRoom = null
  }

  @Mutation
  public addInteractivePoint(name: string) {
    const interactPoint = GlobalSceneHelper.getInteractionPoint(name)
    this._activeInteractionPoints.push(interactPoint)

    return this
  }

  @Mutation
  public removeInteractivePoint(name: string) {
    this._activeInteractionPoints = this._activeInteractionPoints.filter(point => point.name !== name)

    return this
  }

  @Mutation
  public updatePositionsInteractivePoint(data: {name: string, transformX: number, transformY: number}) {
    const point = this._activeInteractionPoints.find(interactPoint => interactPoint.name === data.name)

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
