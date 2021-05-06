import gsap from "gsap";
import {AnimationElementOptions} from "~/core/animations/types";

export default abstract class AnimationElement {
  public abstract enter(options: AnimationElementOptions): void;

  public abstract leave(options: AnimationElementOptions): void;

  protected _getFreshTimeline(onStart: () => void, onComplete: () => void) {
    return gsap.timeline({onComplete, onStart})
  }
}
