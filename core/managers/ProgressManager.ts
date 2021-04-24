import { Level } from "../types";

/**
 * @description
 * TODO
 *
 * @example
 * TODO
 */
class ProgressManager {
  // TODO faire in pourcentage

  // 🚧 Propriétés temporaires à remplacer par des données API
  public userAchievedWords: number = 0;
  private levels: Array<Level> = [];

  // PROPERTIES
  private currentLevel: Level = this.levels[0];
  private nextLevel: Level = this.currentLevel;
  private toNextLevelSteps: number = 0;

  // passer les données de l'utilisateur (mots echieved ET mots total)
  // retourne le niveau de la jauge et le niveau -1 mot + nom du palier
  constructor() {}

  init() {
    this._initLevels();
    this.update();
  }

  /**
   * update : set the current level and the next level from the updated user achieved words number
   */
  update() {
    // 🚧 incrémentation à la dure temporaire
    this.userAchievedWords++;

    const next = this._foundNextLevel();
    if (next.level) {
      this.nextLevel = next.level!;
      this.toNextLevelSteps = next.steps;
      this.currentLevel = this._foundLevel();
    } else {
      this.currentLevel = this.nextLevel;
      this.toNextLevelSteps = 0;
    }
  }

  /**
   * 🚧 _initLevels : temporary function to populate levels array
   */
  private _initLevels() {
    // Add levels
    // Level Newbie is the default one (when the user has no achieved word)
    this.levels.push({
      name: "newbie",
      order: 0,
      rules: 0
    });
    // Push levels separately to comment it easily if needed
    this.levels.push({
      name: "debutant",
      order: 1,
      rules: 3
    });
    this.levels.push({
      name: "intermediaire",
      order: 2,
      rules: 2
    });
    this.levels.push({
      name: "expert",
      order: 3,
      rules: 5
    });
    // Sort levels by order property
    this.levels = this.levels.sort((a, b) =>
      a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    );
  }

  /**
   * _foundNextLevel : found the next level to pass (the user havnt pass this next level)
   * @returns {Level}
   */
  private _foundNextLevel() {
    let count = 0;
    let nextCount = 0;
    let next;
    let nextStep = 0;
    this.levels.forEach(level => {
      nextCount = level.rules;
      for (let index = 0; index < level.rules; index++) {
        if (count == this.userAchievedWords) {
          next = level;
          nextStep = nextCount;
        }
        nextCount--;
        count++;
      }
    });
    return { level: next, steps: nextStep };
  }

  /**
   * _foundLevel : found the current level by getting the level before the next level (je sais pas si c'est clair :) ) The user have passed this level
   * @returns {Level}
   */
  private _foundLevel() {
    const foundedCurrentLevel = this.levels.find(
      element => element.order == this.nextLevel.order - 1
    );
    if (foundedCurrentLevel) return foundedCurrentLevel;
    else return this.nextLevel;
  }

  // - GETTERS

  get next(): Level {
    return this.nextLevel;
  }

  get steps(): number {
    return this.toNextLevelSteps;
  }

  get current(): Level {
    return this.currentLevel;
  }
}

const instance = new ProgressManager();

export default instance;
