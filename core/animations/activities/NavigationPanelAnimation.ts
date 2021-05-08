import AnimationElement from "~/core/animations/AnimationElement";
import CustomEase from 'gsap/CustomEase'
import {AnimationElementOptions} from "~/core/animations/types";

export default class NavigationPanelAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create("panelMovement", "M0,0 C0.33,0 0,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    tl.from(options.el, {
      y: 200,
      autoAlpha: 0,
      duration: 1,
      ease: 'panelMovement'
    })
  }

  leave(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    tl.to(options.el, {
      y: 200,
      autoAlpha: 0,
      duration: 1,
      ease: 'panelMovement'
    })
  }
}
