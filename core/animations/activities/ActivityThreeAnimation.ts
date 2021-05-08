import AnimationElement from "~/core/animations/AnimationElement";
import CustomEase from 'gsap/CustomEase'
import {AnimationElementOptions} from "~/core/animations/types";

export default class ActivityThreeAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create("asideMenu", "M0,0 C0.33,0 0,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const hiddenElements = [
      options.el.querySelector('.progress-bar-container'),
      options.el.querySelector('.word-name'),
      options.el.querySelector('canvas'),
      options.el.querySelector('.content-container'),
    ]
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    // Hidden elements
    tl.set(hiddenElements, {
      autoAlpha: 0
    })

    // Word name aside
    tl.from(options.el.querySelector('.word-name'), {
      duration: 1.1,
      ease: 'asideMenu',
      y: 100
    }, '-=0.3')

    tl.to(options.el.querySelector('.word-name'), {
      autoAlpha: 1,
      ease: 'asideMenu',
    }, '-=1.1')
    // Progress bar container
    tl.from(document.querySelector('.progress-bar-container'), {
      width: 0,
      duration: 0.6,
      autoAlpha: 0,
      x: -12,
      ease: 'progressBar'
    }, '-=0.7')
    // Progress bar width
    tl.from(document.querySelector('.progress-bar-width'), {
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
    tl.to('.content-container', {
      duration: 0.1,
      autoAlpha: 1
    }, '-=0.1')
    // Text element
    const textsElements = [
      '.content-title',
      '.content-wordInfo',
      '.content-origin',
      '.content-mediaContainer'
    ]
    tl.from(textsElements, {
      stagger: {
        each: 0.3
      },
      autoAlpha: 0,
      y: 40
    })
  }

  leave(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    const hiddenElements = [
      options.el.querySelector('.progress-bar-container'),
      options.el.querySelector('.word-name'),
      options.el.querySelector('.img-word'),
      options.el.querySelector('.content-container'),
      options.el.querySelector('.aside-container-footer'),
    ]

    tl.to(hiddenElements, {
        duration: 2,
        autoAlpha: 0
      }
    )
  }
}
