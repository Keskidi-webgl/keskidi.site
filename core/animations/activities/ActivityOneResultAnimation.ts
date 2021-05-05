import AnimationElement from "~/core/animations/AnimationElement";
import CustomEase from 'gsap/CustomEase'
import {AnimationElementOptions} from "~/core/animations/types";

export default class ActivityOneResultAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create("wordImageResult", "M0,0 C0.33,0 0.01,1 1,1 ")
    CustomEase.create("bgAnimContainer", "M0,0 C0.9,0 0.38,1 1,1 ")
    CustomEase.create("btnActivityTwo", "M0,0 C0.33,0 0,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    tl.from('.result-img-good-word', {
      duration: 0.930,
      y: -window.innerHeight / 2,
      ease: 'wordImageResult'
    })
    tl.from('.bg-anim-container', {
      duration: 0.960,
      x: window.innerWidth + 100,
      ease: 'bgAnimContainer'
    }, 0.4)
    tl.from('.btn-activity-two', {
      duration: 0.767,
      y: 300,
      ease: 'btnActivityTwo'
    }, 0.5)
    tl.from('.btn-activity-two', {
      duration: 1,
      autoAlpha: 0,
      ease: 'btnActivityTwo'
    }, 0.5)
  }

  leave(options: AnimationElementOptions): void {

  }
}
