import { Level } from "../types";

/**
 * @description
 * ProgressPercentManager is a class to get / set the level of the current connected user.
 *
 * @example
 * // - Initialization
 * ProgressPercentManager.init(6,10)
 * // - Update levels
 * ProgressPercentManager.update(() => {
 *  // New level passed !
 * })
 */
class ProgressPercentManager {
  // User data
  private _userAchievedWords: number = 0;
  private _words: number = 0;
  private levelsArray: Array<Level> = require("../datas/levels.json");

  // >> PROPERTIES

  // - current
  private currentLevel: Level | null = null;
  private percentLevel: number = 0;

  // - next
  private nextLevel: Level | null = this.currentLevel;
  private toNextLevelSteps: number = 0;

  // - prev
  private prevLevel: Level | null = this.currentLevel;

  // - units (in percent)
  private oneWordRule: number = 0;

  constructor() {}

  init(userAchievedWords: number, words: number) {
    this._userAchievedWords = userAchievedWords;
    this._words = words;

    // this._initLevels();
    this._setProgress();
  }

  /**
   * update : set the current level and the next level from the updated user achieved words number
   */
  update(onNewLevelPassed: CallableFunction) {
    // Si il manque moins d'un mot pour passer au niveau suivant, alors l'utilisateur vient de passer au niveau suivant
    if (
      this.toNextLevelSteps <= 1 ||
      this.percentLevel + this.oneWordRule == 100
    ) {
      // You just passed a new level ! 🎉
      onNewLevelPassed();
    }

    this._userAchievedWords++;
    this._setProgress();
  }

  /**
   * Calculate the user progress from number of achieved words
   */
  private _setProgress() {
    this._setPercent();
    this.setCurrentLevel();
    this._setNextLevel();
    this._setPrevLevel();
  }

  /**
   * Get the current percent from the words number given and set it to the property
   */
  private _setPercent() {
    // console.log(">> setPercent");
    // console.log("_userAchievedWords", this._userAchievedWords);
    // console.log("_words", this._words);

    this.percentLevel = (this._userAchievedWords * 100) / this._words;
    this.oneWordRule = 100 / this._words;
  }

  /**
   * Get the current level and set it to the property
   */
  public setCurrentLevel() {
    let totalPercent = 100;
    let final: Level | null = null;
    let all = this.levelsArray;

    // On part du dernier niveau pour calculer le niveau actuel, donc on inverse l'ordre du tableau
    all = all.sort((a, b) =>
      a.order > b.order ? -1 : b.order > a.order ? 1 : 0
    );

    all.forEach(level => {
      if (this.percentLevel < totalPercent) {
        totalPercent -= level.rule;
      } else if (this.percentLevel >= totalPercent && final == null) {
        final = level;
      }
    });

    if (final) this.currentLevel = final;

    return this;
  }

  /**
   * Get the next level and the steps to got to and set it to the properties
   */
  private _setNextLevel() {
    if (this.currentLevel) {
      // =======================================================
      // >> Récupérer le prochain niveau
      const foundedNextLevel = this.levelsArray.find(
        element => element.order == this.currentLevel!.order + 1
      );

      // =======================================================
      // >> Récupérer le nombre de mots avant le prochain niveau
      // Récupération des niveau courant, le prochain et ceux d'avant
      const all = this.levelsArray;
      const prevsLevels = all.filter(
        element => element.order <= this.currentLevel!.order + 1
      );
      // Incrémentation du pourcentage cible (pour atteindre le prochain niveau)
      let levelPercent = 0;
      prevsLevels.forEach(prevLevel => {
        levelPercent += prevLevel.rule;
      });

      // =======================================================
      // >> ssigner les propriétés
      if (foundedNextLevel) this.nextLevel = foundedNextLevel;
      else this.nextLevel = this.currentLevel;
      this.toNextLevelSteps =
        (levelPercent - this.percentLevel) / this.oneWordRule;
    }
  }

  /**
   * Get the prev level and set it to the property
   */
  private _setPrevLevel() {
    if (this.currentLevel) {
      // Récupérer le prochain niveau
      const all = this.levelsArray;
      const foundedPrevLevel = all.find(
        element => element.order == this.currentLevel!.order - 1
      );
      if (foundedPrevLevel) this.prevLevel = foundedPrevLevel;
      else this.prevLevel = this.currentLevel;
    }
  }

  /**
   * Sort levels by orders
   */
  private _initLevels() {
    // Sort levelsArray by order property
    this.levelsArray = this.levelsArray.sort((a, b) =>
      a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    );
  }

  // - GETTERS

  get next(): Level | null {
    return this.nextLevel;
  }

  get prev(): Level | null {
    return this.prevLevel;
  }

  /**
   * Return PERCENT of last position
   */
  get prevPercent(): number {
    const prevPosition = this.percent - this.oneWordRule;
    return prevPosition > 0 ? prevPosition : 0;
  }

  /**
   * Return NUMBER of words before the next level
   */
  get steps(): number {
    return this.toNextLevelSteps;
  }

  get current(): Level | null {
    return this.currentLevel;
  }

  /**
   * Return PERCENT of actual position
   */
  get percent(): number {
    return this.percentLevel;
  }

  get levels(): Array<Level> {
    return this.levelsArray;
  }

  get words() {
    return this._words;
  }

  get userAchievedWords() {
    return this._userAchievedWords;
  }

  // - SETTERS
  set userAchievedWords(nbWords: number) {
    this._userAchievedWords = nbWords;
  }

  set words(totalWords: number) {
    this._words = totalWords;
  }
}

const instance = new ProgressPercentManager();

export default instance;
