<template>
  <div class="page-container" data-namespace="test-progress">
    <div class="card">
      <button class="button" @click="increment()">new word</button>
      <p>Ton nombre de mots : {{ nb }}</p>
      <p v-if="level">Ton niveau : {{ level.name }}</p>
      <p v-if="nextLevel">
        Prochain niveau {{ nextLevel.name }} dans : {{ nextSteps }} mots
      </p>
      <ul class="levels"></ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { ProgressManager } from "~/core/managers";
import { Level } from "~/core/types";

/**
 * @info
 * Page de debug de la progression par palier
 *
 * 2021-04-25 : première version du ProgressManager. Les données sont en dur et le calcul se fait en nombre de mots.
 * => piste d'amélioration : faire la calcul en pourcentage (cf Progressmanager.ts)
 */

@Component
export default class TestProgressPage extends Vue {
  public onProgress: boolean = false;
  public level: Level | null = null;
  public nb: number = 0;
  public nextLevel: Level | null = null;
  public nextSteps: number = 0;

  mounted() {
    ProgressManager.init();
    this.level = ProgressManager.current;
    this.nb = ProgressManager.userAchievedWords;
    this.nextLevel = ProgressManager.next;
    this.nextSteps = ProgressManager.steps;
  }

  increment() {
    ProgressManager.update();
    this.level = ProgressManager.current;
    this.nb = ProgressManager.userAchievedWords;
    this.nextLevel = ProgressManager.next;
    this.nextSteps = ProgressManager.steps;
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
    width: 50%;
    background: #f2f2f2;
    border-radius: 73px;
    padding: 100px 50px;
    height: 60vh;

    display: flex;
    align-items: flex-end;

    .levels {
      width: 100%;
      display: flex;

      .item {
        height: 10px;
        width: 10px;
        background: chocolate;
        margin: 10px;
      }
    }
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
}
</style>
