import {AnimationAction, AnimationClip, Group} from "three";
import {TomAnimation, TomAnimationName} from "~/core/types";
import {SceneManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";
import Helpers from "~/core/utils/helpers";
import gsap from "gsap";


/**
 * This class is a manager for Tom fbx object. We retrieve one instance of fbx object to use it in different scenes
 */
class TomSceneElement {
  private _sceneElement: Group | null
  private _animations: TomAnimation | null
  private _activeAnimationAction: {data: AnimationAction, name: TomAnimationName} | null

  constructor() {
    this._sceneElement = null
    this._animations = null
    this._activeAnimationAction = null
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
    this._sceneElement!.position.set(-3, -13, 0)
    this._sceneElement!.rotation.y = 0
  }

  public setupForGlobalScene() {
    this._checkIfInit()

    this._sceneElement!.scale.set(0.8, 0.8, 0.8)
    this._sceneElement!.position.set(50, 40, 500)
    this._sceneElement!.rotation.y = Helpers.degreeToRadiant(-25)

    return this
  }

  public playAnimation(animationName: TomAnimationName, sceneContext: SceneManager,duration?:number,callback?:()=>void) {
    let animationClip: AnimationClip | null = null


    switch (animationName) {
      case "idle":
        animationClip = this.animations.idle
        break;
      case "muscle":
        animationClip = this.animations.muscle
        break;
      case "head":
        animationClip = this.animations.head
        break;
      case "down":
        animationClip = this.animations.down
        break;
      case "punch":
        animationClip = this.animations.punch
        break;
      case "hello":
        animationClip = this.animations.hello
        break;
    }



    const animationActionToPlay = sceneContext.generateAnimationAction(animationClip, GLTF_ASSET.TOM)
    animationActionToPlay.reset()

    if (this._activeAnimationAction) {
      this._activeAnimationAction.data.fadeOut(1)
    }
    this._activeAnimationAction = {
      data: animationActionToPlay,
      name: animationName
    }

    animationActionToPlay.fadeIn(1)
    animationActionToPlay.play()
    if (duration && callback){
      gsap.to(null,{duration:duration,onComplete:()=>{
          callback()
        }})
    }

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

  get activeAnimationAction() {
    return this._activeAnimationAction
  }

}

const instance = new TomSceneElement()

export default instance
