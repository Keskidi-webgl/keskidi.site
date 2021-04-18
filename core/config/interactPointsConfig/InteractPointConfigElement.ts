import {INTERACT_POINT_NAME} from "~/core/enums";
import {Vector3} from "three";

export default abstract class InteractPointConfigElement {

  protected abstract _name: INTERACT_POINT_NAME
  protected abstract _isCompleted: () => boolean
  protected abstract _canvasCoords: () => Vector3
  protected _transformX: number = 0
  protected _transformY: number = 0
  protected abstract _url: string

  public get name() {
    return this._name
  }

  public get isCompleted() {
    return this._isCompleted
  }

  public get canvasCoords() {
    return this._canvasCoords
  }

  public get transformX() {
    return this._transformX
  }

  public get transformY() {
    return this._transformY
  }

  public get url() {
    return this._url
  }

  public set transformX(transformX) {
    this._transformX = transformX
  }

  public set transformY(transformY) {
    this._transformY = transformY
  }

}
