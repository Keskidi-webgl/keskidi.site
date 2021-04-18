import {Vector3} from "three";

export default abstract class CamPositionConfigElement {
  protected abstract _name: string
  protected abstract _coords: () => { cameraPos: Vector3, lookAtPosition: Vector3 }

  public get name() {
    return this._name
  }

  public get coords() {
    return this._coords
  }
}
