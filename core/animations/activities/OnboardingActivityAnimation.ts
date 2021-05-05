import AnimationElement from "~/core/animations/AnimationElement";

class OnboardingActivityAnimation extends AnimationElement {
  enter(el: HTMLCollection, onComplete: () => void): void {
    const tl = this._getFreshTimeline(onComplete)
    tl.from(document.querySelectorAll('.onboarding-card'), {
      y: 500,
      duration: 1,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'power3'
    }, 0.3)
      .from(document.querySelector('.onboarding-title'), {
        duration: 1,
        autoAlpha: 0,
        y: -150,
      }, 0.3)
  }

  leave(el: HTMLCollection, onComplete: () => void): void {
    const tl = this._getFreshTimeline(onComplete)
    tl.to(document.querySelectorAll('.onboarding-card'), {
      y: 500,
      duration: 1,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'power3'
    }, 0.2)
    tl.to(document.querySelector('.onboarding-btn-next'), {
      y: 500,
      duration: 1,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'power3'
    }, 0.2)
      .to(document.querySelector('.onboarding-title'), {
        duration: 0.8,
        autoAlpha: 0,
        y: -60,
      }, 0.2)
  }

}

export default new OnboardingActivityAnimation()
