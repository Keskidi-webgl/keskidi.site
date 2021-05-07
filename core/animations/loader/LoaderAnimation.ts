import AnimationElement from "~/core/animations/AnimationElement";
import {AnimationElementOptions} from "~/core/animations/types";
import CustomEase from "gsap/CustomEase";

export default class LoaderAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create('logo', 'M0,0 C0.89,0 0.24,1 1,1 ')
    CustomEase.create("words", "M0,0 C0.61,0 0.3,1 1,1 ")
  }

  enter(options: AnimationElementOptions): void {
    const tl = this._getFreshTimeline(options.onStart, options.onComplete)
    const logo = options.el.querySelector('.logo-container')!
    const textElements = [
      options.el.querySelector('.site-loader-container-expression')!,
      options.el.querySelector('.site-loader-container-description')!,
      options.el.querySelector('.overlay-loader-btn')!,
    ]
    tl.from(logo, {
      duration: 1.5,
      y: window.innerHeight/2,
      scale: 0,
      ease: 'logo',
    })
    tl.from(textElements, {
      duration: 1,
      stagger: {
        each: 0.2,
        ease: "power2.inOut",
      },
      y: 350,
      autoAlpha: 0,
      ease: 'words'
    }, '-=0.2')

  }

  leave(options: AnimationElementOptions): void {

  }
}
