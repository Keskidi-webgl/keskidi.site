<template>
  <div class="page-container" data-namespace="test-progress">
    <div class="card">
      <button class="button" @click="increment()">new word</button>

      <ProgressLevel
        v-if="level"
        :stroke="4"
        :radius="170 / 2"
        :total="9"
        :progress="nb"
        :level="level.name"
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { ProgressPercentManager } from "~/core/managers";
import { Level } from "~/core/types";
import ProgressLevel from "~/components/activities/ProgressLevel.vue";

/**
 * @info
 * Page de debug de la progression par palier
 *
 * 2021-04-24 : première version du ProgressManager. Les données sont en dur et le calcul se fait en nombre de mots.
 * => piste d'amélioration : faire la calcul en pourcentage (cf ProgressManager.ts)
 *
 * 2021-04-25 : deuxième version du ProgressPercentManager. Les données sont calculées en pourcentage.
 */

@Component({
  components: {
    ProgressLevel
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

  mounted() {
    ProgressPercentManager.init();
    this.init();
    this.level = ProgressPercentManager.current;
    this.width = ProgressPercentManager.percent + "%";
    this.nextLevel = ProgressPercentManager.next;
    this.nextSteps = ProgressPercentManager.steps;
    this.prevlevel = ProgressPercentManager.prev;
    this.prevPosition = ProgressPercentManager.prevPercent;
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
    background: #ff7869;
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
