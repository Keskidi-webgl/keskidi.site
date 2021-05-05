<template>
  <div class="page-container" data-namespace="test-progress">
    <div class="card">
      <button class="button" @click="increment()">new word</button>

      <ProgressLevel
        v-if="level"
        :total="6"
        :progress="6"
        :level="level.name"
        :levels="levels"
      />

      <p>Ton nombre de mots : {{ nb }}</p>
      <p v-if="level">Ton niveau : {{ level.name }}</p>
      <p v-if="nextLevel">
        Prochain niveau {{ nextLevel.name }} dans : {{ nextSteps }} mots
      </p>
      <p v-if="nextLevel">
        Niveau précédent : {{ prevlevel.name }} à la position
        {{ prevPosition }}%
      </p>

      <div class="bar">
        <div :style="{ width: width }" v-if="width" id="percent">
          {{ width }}
        </div>
      </div>
      <div class="bar" id="bar"></div>

      <!-- <button class="button" @click="nextActivity()">
        new activity passed
      </button>
      <p v-if="currentStep">
        {{ currentStep.id }} / {{ totalSteps }} || {{ currentStep.text }} ||
        {{ progress }}
      </p>
      <ProgressBar v-if="currentStep" :step="currentStep" :total="totalSteps" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {
  ProgressBarActivityManager,
  ProgressPercentManager
} from "~/core/managers";
import { Level, Step } from "~/core/types";
import ProgressLevel from "~/components/global/ProgressLevel.vue";
import ProgressBar from "~/components/activities/ProgressBar.vue";

@Component({
  components: {
    ProgressLevel,
    ProgressBar
  }
})
export default class TestProgressPage extends Vue {
  // Default
  public onProgress: boolean = false;

  // Only in front
  public nb: number = 0;

  // Get from ProgressPercentManager
  public width: string = "0";
  public level: Level | null = null;
  public nextLevel: Level | null = null;
  public nextSteps: number = 0;
  public prevlevel: Level | null = null;
  public prevPosition: number = 0;
  public nbWords: number = 0;
  public totalWords: number = 0;

  // for ProgressBarActivityManager
  public totalSteps: number = 0;
  public currentStep: Step | null = null;
  public progress: string = "";
  public levels: Array<Level> = [];

  mounted() {
    ProgressPercentManager.init();
    this.init();
    this.level = ProgressPercentManager.current;
    this.width = ProgressPercentManager.percent + "%";
    this.nextLevel = ProgressPercentManager.next;
    this.nextSteps = ProgressPercentManager.steps;
    this.prevlevel = ProgressPercentManager.prev;
    this.prevPosition = ProgressPercentManager.prevPercent;
    this.levels = ProgressPercentManager.levels;
    this.nbWords = ProgressPercentManager.userAchievedWords;
    this.totalWords = ProgressPercentManager.words;

    this.initActivityBar();
  }

  increment() {
    if (this.nb < ProgressPercentManager.words) {
      ProgressPercentManager.update(() => {});
      this.nb++;
      this.level = ProgressPercentManager.current;
      this.width = ProgressPercentManager.percent + "%";
      this.nextLevel = ProgressPercentManager.next;
      this.nextSteps = ProgressPercentManager.steps;
      this.prevlevel = ProgressPercentManager.prev;
      this.prevPosition = ProgressPercentManager.prevPercent;
      this.nbWords = ProgressPercentManager.userAchievedWords;
    }
  }

  init() {
    const bar = document.getElementById("bar");
    let left = 0;
    const all = ProgressPercentManager.levels;
    all.reverse().forEach(level => {
      left = left + level.rule;
      let lvl = document.createElement("span");
      lvl.innerHTML = "| " + level.name;
      lvl.style.left = left + "%";
      lvl.style.position = "absolute";
      bar?.appendChild(lvl);
    });
  }

  initActivityBar() {
    ProgressBarActivityManager.init();
    this.totalSteps = ProgressBarActivityManager.steps.length;
    this.currentStep = ProgressBarActivityManager.step;
    this.progress = ProgressBarActivityManager.progress + "%";
  }

  nextActivity() {
    ProgressBarActivityManager.next();
    this.totalSteps = ProgressBarActivityManager.steps.length;
    this.currentStep = ProgressBarActivityManager.step;
    this.progress = ProgressBarActivityManager.progress + "%";
  }
}
</script>

<style scoped lang="scss">
.page-container {
  z-index: 100;
  display: flex;
  align-items: center;
  padding-left: 7vw;

  .card {
    width: 80%;
    background: grey;
    border-radius: 73px;
    // padding: 100px 50px;
    height: 80vh;
    display: flex;
  }
  .button {
    padding: 8px 13px;
    background: #eb5757;
    border-radius: 67.147px;
    border: none;
    width: fit-content;
    color: white;
    cursor: pointer;

    margin-top: 2vh;
  }

  .bar {
    width: 100%;
    border: 1px solid black;
    padding: 5px;
    position: relative;
  }

  #percent {
    height: 100%;
    background-color: chartreuse;
    transition: 0.2s ease all;
  }
}
</style>
