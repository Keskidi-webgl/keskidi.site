import {SceneManager} from "~/core/managers";
import TomSceneElement from "~/core/scene/TomSceneElement";
import {GLTF_ASSET} from "~/core/enums";

class GlobalScene {
  private _context: SceneManager | null

  constructor() {
    this._context = null
  }

  public setSceneContext(sceneContext: SceneManager) {
    this._context = sceneContext
  }

  public playTomIdle() {
    if (!this._context) {
      throw new Error(`You need to set a sceneContext for GlobalScene`)
    }
    this._context.playAnimation(TomSceneElement.animations.idle, GLTF_ASSET.TOM)
  }

  public playTomMuscle() {
    if (!this._context) {
      throw new Error(`You need to set a sceneContext for GlobalScene`)
    }
    this._context.playAnimation(TomSceneElement.animations.muscle, GLTF_ASSET.TOM)
  }

  get context() {
    if (!this._context) {
      throw new Error(`You need to set a sceneContext for GlobalScene`)
    }
    return this._context
  }
}

const instance = new GlobalScene()

export default instance
