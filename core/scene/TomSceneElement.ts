import {Group} from "three";
import {TomAnimation} from "~/core/types";
import {SceneManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";

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

  public setupForActivityScene() {
    this._checkIfInit()
    this._sceneElement!.scale.set(0.2, 0.2, 0.2)
    this._sceneElement!.position.set(-3, -20, 0)
    this._sceneElement!.rotation.y = 0
  }

  public setupForGlobalScene() {
    this._checkIfInit()

    this._sceneElement!.scale.set(0.8, 0.8, 0.8)
    this._sceneElement!.position.set(50, 40, 500)
    this._sceneElement!.rotation.y = -45

    return this
  }

  public playIdleAnimation(sceneContext: SceneManager) {
    this._checkIfInit()
    sceneContext.playAnimation(this._animations!.idle, GLTF_ASSET.TOM)
  }

  public playMuscleAnimation(sceneContext: SceneManager) {
    this._checkIfInit()
    sceneContext.playAnimation(this._animations!.muscle, GLTF_ASSET.TOM)
  }

  public playHeadAnimation(sceneContext: SceneManager) {
    this._checkIfInit()
    sceneContext.playAnimation(this._animations!.head, GLTF_ASSET.TOM)
  }

  public playPunchAnimation(sceneContext: SceneManager) {
    this._checkIfInit()
    sceneContext.playAnimation(this._animations!.punch, GLTF_ASSET.TOM)
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
