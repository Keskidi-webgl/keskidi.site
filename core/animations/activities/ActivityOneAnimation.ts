import AnimationElement from "~/core/animations/AnimationElement";
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import TomSceneElement from "~/core/scene/TomSceneElement";
import {AnimationElementOptions} from "~/core/animations/types";
import DomHelper from "~/core/utils/domHelper";

export default class ActivityOneAnimation extends AnimationElement {
  constructor() {
    super();CustomEase.create("aside", "M0,0 C0.89,0 0.24,1 1,1 ")

    CustomEase.create("wordName", "M0,0 C0.61,0 0.3,1 1,1 ")
    CustomEase.create("instruction", "M0,0 C0.33,0 0.01,1 1,1 ")
    CustomEase.create("cards", "M0,0 C0.33,0 0,1 1,1 ")
    CustomEase.create("progressBar", "M0,0 C0.33,0 0,1 1,1 ")
    CustomEase.create("interrogation", "M0,0 C0.56,0 0,1 1,1 ")
    CustomEase.create('button', 'M0,0 C1,0 0.67,1 1,1')
  }

  enter(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    // Main element
    tl.from(options.el, {
      autoAlpha: 0,
      duration: 0.5
    }, 0)
      // Aside
      .from('.activity-element-aside', {
        duration: 1.3,
        x: -DomHelper.ASIDE_WIDTH,
        ease: 'aside'
      }, 0.6)
      // Word name
      .from('.word-name', {
        autoAlpha: 0,
        duration: 1.16,
        y: 100,
        ease: 'wordName'
      }, 1.6)
      // Tom canvas
      .from('canvas', {
        autoAlpha: 0,
        duration: 1.16,
        y: 500,
        ease: 'wordName'
      }, 1.7)
      // Instructions
      .from('.instruction', {
        autoAlpha: 0,
        duration: 1.1,
        y: -70,
        ease: 'instruction',
      }, 1.8)
      // Choice cards
      .from(document.querySelectorAll('.choice-card'), {
        y: 300,
        duration: 1,
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'cards'
      }, 2.3)
      // Progress bar container
      .from(document.querySelectorAll('.progress-bar-container'), {
        width: 0,
        duration: 0.6,
        autoAlpha: 0,
        x: -12,
        ease: 'progressBar'
      }, 2.2)
      // Progress bar width
      .from(document.querySelectorAll('.progress-bar-width'), {
        duration: 0.3,
        width: 0,
        autoAlpha: 0,
        ease: 'progressBar'
      }, 2.2)
      // Interrogation
      .from('.interrogation', {
        duration: 1,
        autoAlpha: 0,
        ease: 'interrogation'
      }, 2.7)
      // Button validate
      .from('.btn-validate', {
        y: 80,
        duration: 1,
        autoAlpha: 0,
        ease: 'interrogation'
      }, 2.3)
  }

  leave(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    tl.to(options.el, {
      duration: 2
    })
  }
}
