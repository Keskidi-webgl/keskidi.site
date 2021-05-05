import gsap from "gsap";

export default abstract class AnimationElement {
  public abstract enter(el: HTMLCollection, onComplete: () => void): void;

  public abstract leave(el: HTMLCollection, onComplete: () => void): void;

  protected _getFreshTimeline(onComplete: () => void) {
    return gsap.timeline({onComplete})
  }
}
