import AnimationElement from "~/core/animations/AnimationElement";
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

export default class OnboardingActivityAnimation extends AnimationElement {
  constructor() {
    super();
    CustomEase.create('button', 'M0,0 C1,0 0.67,1 1,1')
    CustomEase.create('cards', 'M0,0 C0.88,0 0.25,1 1,1')
    CustomEase.create('title', 'M0,0 C0.88,0 0.49,1 1,1 ')
  }

  enter(el: HTMLCollection, onComplete: () => void): void {
    gsap.from(el, {
      duration: 1,
      autoAlpha: 0,
      ease: 'title'
    })
  }

  leave(el: HTMLCollection, onComplete: () => void): void {
    const tl = this._getFreshTimeline(onComplete)
    tl.to(document.querySelectorAll('.onboarding-card'), {
      y: 750,
      duration: 0.6,
      autoAlpha: 0,
      stagger: 0.25,
      ease: 'cards'
    }, 0)
    tl.to(document.querySelector('.onboarding-btn-next'), {
      y: 200,
      duration: 0.5,
      autoAlpha: 0,
      ease: 'button'
    }, 0)
      .to(document.querySelector('.onboarding-title'), {
        duration: 0.767,
        autoAlpha: 0,
        y: -160,
        ease: 'title'
      }, 0)
  }
}
