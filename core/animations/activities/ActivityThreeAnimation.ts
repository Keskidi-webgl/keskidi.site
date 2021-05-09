import AnimationElement from "~/core/animations/AnimationElement";
import CustomEase from 'gsap/CustomEase'
import {AnimationElementOptions} from "~/core/animations/types";

export default class ActivityThreeAnimation extends AnimationElement {
  constructor() {
    super()
    CustomEase.create("asideMenu", "M0,0 C0.33,0 0,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    // Word name aside
    tl.from(options.el.querySelector('.word-name-activity-three'), {
      duration: 1.1,
      ease: 'asideMenu',
      y: 100,
      autoAlpha: 0
    }, '-=0.3')
      // Progress bar container
      .from(document.querySelector('.progress-bar-container'), {
        width: 0,
        duration: 0.6,
        autoAlpha: 0,
        x: -12,
        ease: 'progressBar'
      }, '-=0.7')
      // Progress bar width
      .from(document.querySelector('.progress-bar-width'), {
        duration: 0.3,
        width: 0,
        autoAlpha: 0,
        ease: 'progressBar'
      }, '-=0.4')
      // Tom canvas
      .from('canvas', {
        autoAlpha: 0,
        duration: 1.16,
        y: 500,
        ease: 'wordName'
      })
      // Content container
      .from(options.el.querySelector('.content-container'), {
        duration: 0.7,
        autoAlpha: 0
      })
  }

  leave(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)

    CustomEase.create("asideExtend", "M0,0 C0.89,0 0.24,1 1,1 ")

    const hiddenElements = [
      document.querySelector(".aside-container"),
      document.querySelector(".word-name"),
      options.el.querySelector('canvas'),
      document.querySelector('.content-container')
    ]
    tl.to(hiddenElements, {
      duration: 1,
      autoAlpha: 0
    })
      .to(".activity-element-aside", {
        width: window.innerWidth,
        duration: 1,
        ease: "asideExtend"
      })
  }
}
