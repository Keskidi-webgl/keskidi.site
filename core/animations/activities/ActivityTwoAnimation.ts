import AnimationElement from "~/core/animations/AnimationElement";
import CustomEase from 'gsap/CustomEase'
import {AnimationElementOptions} from "~/core/animations/types";
import DomHelper from "~/core/utils/domHelper";

export default class ActivityTwoAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create("asideMenu", "M0,0 C0.33,0 0,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const hiddenElements = [
      '.progress-bar-container',
      '.word-name',
      '.img-word',
      '.content-container'
    ]
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    // Hidden elements
    tl.set(hiddenElements, {
      autoAlpha: 0
    })
    tl.set('.activity-element-content', {
      padding: 0
    })
    // Aside menu
    tl.set('.activity-element-aside', {
      width: window.innerWidth
    })
    tl.to('.activity-element-aside', {
      duration: 1.5,
      width: DomHelper.ASIDE_WIDTH,
      ease: 'asideMenu'
    })
    tl.set('.activity-element-content', {
      padding: DomHelper.PADDING_ACTIVITY_CONTAINER
    })
    // Word name aside
    tl.from('.word-name', {
      duration: 1.1,
      ease: 'asideMenu',
      y: 100
    }, '-=0.3')
    tl.to('.word-name', {
      autoAlpha: 1,
      ease: 'asideMenu',
    }, '-=1.1')
    // Word image
    tl.from('.img-word', {
      duration: 1,
      ease: 'asideMenu',
      y: -30,
      scale: 0.8
    }, '-=0.9')
    tl.to('.img-word', {
      autoAlpha: 1,
      ease: 'asideMenu',
    }, '-=1')
    // Progress bar container
    tl.from(document.querySelectorAll('.progress-bar-container'), {
      width: 0,
      duration: 0.6,
      autoAlpha: 0,
      x: -12,
      ease: 'progressBar'
    }, '-=0.7')
    // Progress bar width
    tl.from(document.querySelectorAll('.progress-bar-width'), {
      duration: 0.3,
      width: 0,
      autoAlpha: 0,
      ease: 'progressBar'
    }, '-=0.4')
    // Aside footer
    tl.from(document.querySelector('.aside-container-footer'), {
      duration: 0.3,
      y: 100,
      autoAlpha: 0,
      ease: 'progressBar'
    }, '-=0.2')
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
    }, '-=0.3')
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
        duration: 1,
        autoAlpha: 0
      }
    )
  }
}
