import { Step } from "../types";

/**
 * @description
 * ProgressBarActivityManager is a class to get / set the level of the current connected user.
 */
class ProgressBarActivityManager {
  // >> PROPERTIES
  private _steps: Array<Step> = require("../datas/activitiesSteps.json");
  private _currentStep: Step | null = null;
  private _progress: number = 0;

  init() {
    this._currentStep = this._steps[0];
    this._progress = (this._currentStep!.id * 100) / this._steps.length;
  }

  next() {
    if (this._currentStep!.id < this._steps.length)
      this._currentStep = this._steps[this._currentStep!.id];

    this._progress = (this._currentStep!.id * 100) / this._steps.length;
  }

  get step(): Step | null {
    return this._currentStep;
  }

  get steps(): Array<Step> {
    return this._steps;
  }

  get progress(): number {
    return this._progress;
  }

  set step(step: Step | null) {
    this._currentStep = step;
  }

  set steps(steps: Array<Step>) {
    this._steps = steps;
  }
}

const instance = new ProgressBarActivityManager();

export default instance;
