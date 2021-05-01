import {Group} from "three";
import {TomAnimation} from "~/core/types";

class TomSceneElement {
  private _sceneElement: Group | null
  private _animations: TomAnimation | null

  constructor() {
    this._sceneElement = null
    this._animations = null
  }

  public setSceneElement(sceneElement: Group) {
    this._sceneElement = sceneElement

    return this
  }

  public setAnimations(animations: TomAnimation) {
    this._animations = animations

    return this
  }

  public setupForGlobalScene() {
    this._checkIfInit()

    this._sceneElement!.scale.set(0.8, 0.8, 0.8)
    this._sceneElement!.position.set(50, 40, 500)
    this._sceneElement!.rotation.y = -45

    return this
  }

  private _checkIfInit() {
    if (!this._sceneElement) {
      throw Error('You need to set sceneElement')
    }

    if (!this._animations) {
      throw Error('You need to set animations')
    }
  }

  get animations() {
    this._checkIfInit()

    return this._animations!
  }

  get sceneElement() {
    this._checkIfInit()

    return this._sceneElement!
  }

}

const instance = new TomSceneElement()

export default instance
