import AnimationElement from "~/core/animations/AnimationElement";
import CustomEase from 'gsap/CustomEase'
import {AnimationElementOptions} from "~/core/animations/types";

export default class ActivityProgressionAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create("asideMenu", "M0,0 C0.33,0 0,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    tl.from(options.el, {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'asideMenu'
    })
  }

  leave(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    tl.to(options.el, {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'asideMenu'
    })
  }
}
