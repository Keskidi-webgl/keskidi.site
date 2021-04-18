import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER} from "~/core/enums";

export default abstract class RoomConfigElement {
  protected abstract _urlIdentifier: string
  protected abstract _nextSceneUrl: string
  protected abstract _previousSceneUrl: string
  protected abstract _fullUrl: string
  protected abstract _objects: Array<{ urlId: URL_OBJECT_IDENTIFIER, interactPointName: INTERACT_POINT_NAME }>

  public get urlIdentifier() {
    return this._urlIdentifier
  }

  public get nextSceneUrl() {
    return this._nextSceneUrl
  }

  public get previousSceneUrl() {
    return this._previousSceneUrl
  }

  public get objects() {
    return this._objects
  }

  public get fullUrl() {
    return this._fullUrl
  }
}
