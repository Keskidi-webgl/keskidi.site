import AnimationElement from "~/core/animations/AnimationElement";
import CustomEase from 'gsap/CustomEase'
import {AnimationElementOptions} from "~/core/animations/types";

export default class ActivityOneResultAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create("wordImageResultEnter", "M0,0 C0.33,0 0.01,1 1,1 ")
    CustomEase.create("wordImageResultLeave", "M0,0 C0.41,0 0,1 1,1 ")
    CustomEase.create("bgAnimContainerEnter", "M0,0 C0.9,0 0.38,1 1,1 ")
    CustomEase.create("bgAnimContainerLeave", "M0,0 C0.91,2.76 0.74,0.21 1,1 ")
    CustomEase.create("btnActivityTwo", "M0,0 C0.33,0 0,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    // Image good word
    tl.from('.result-img-good-word-container', {
      duration: 0.930,
      y: -window.innerHeight / 2,
      ease: 'wordImageResultEnter'
    })
    tl.from('.right-word', {
      duration: 0.930,
      y: -window.innerHeight / 2,
      ease: 'wordImageResultEnter'
    }, '-=0.7')
    // Text result
    tl.from('.bg-anim-container', {
      duration: 0.960,
      x: window.innerWidth,
      ease: 'bgAnimContainerEnter'
    }, '-=0.2')
    // Button continue
    tl.from('.btn-activity-two', {
      duration: 0.767,
      y: 300,
      ease: 'btnActivityTwo'
    }, '-=0.4')
    // Button continue
    tl.from('.btn-activity-two', {
      duration: 1,
      autoAlpha: 0,
      ease: 'btnActivityTwo'
    }, '-=0.767')
  }

  leave(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    // Button continue
    tl.to('.btn-activity-two', {
      duration: 1.2,
      y: window.innerHeight / 2,
      ease: 'btnActivityTwo'
    }, 0)
    // Button continue
    tl.to('.btn-activity-two', {
      duration: 1,
      autoAlpha: 0,
      ease: 'btnActivityTwo'
    }, 0)
    // Text result
    tl.to('.bg-anim-container', {
      duration: 1.1,
      x: -window.innerWidth * 2,
      autoAlpha: 0,
      ease: 'bgAnimContainerLeave'
    }, 0.5)
    // Image good word
    tl.to('.result-img-good-word-container', {
      duration: 1.1,
      y: -window.innerHeight,
      ease: 'wordImageResultLeave'
    }, 0.8)
    tl.to('.right-word', {
      duration: 0.930,
      y: -window.innerHeight / 2,
      ease: 'wordImageResultEnter'
    }, '-=0.85')
  }
}
