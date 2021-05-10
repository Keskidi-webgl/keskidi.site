<template>
  <div class="activities-progression main-font">
    <div class="activities-level">
      <span class="main-font"
        ><strong class="number">{{ this.getProgress() }}</strong> <br />
        {{ this.getProgress() > 1 ? "MOTS" : "MOT" }}</span
      >
      <img :src="getLevelpath()" class="level-circle-name" alt="" />
    </div>

    <h1 class="activities-title">
      Bravo, tu as progressé !
      <img
        class="activities-doodle"
        src="~/assets/img/gribouillis_2_blanc.png"
        alt=""
      />
      <img
        class="activities-heart"
        src="~/assets/img/gribouillis_coeur_blanc.png"
        alt=""
      />
      <img
        class="activities-cross"
        src="~/assets/img/gribouillis_croix_blanc.png"
        alt=""
      />
    </h1>

    <p class="activities-description" v-html="activityDescription()">

    </p>

    <CustomButton
      @click.native="hideActivityPanel"
      arrow-color="#FF6644"
      color="white"
      text="Continuer"
      hoverText="#FF6644"
    ></CustomButton>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import CustomButton from "~/components/buttons/CustomButton.vue";
import GlobalStore from "~/store/global";
import {ProgressPercentManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";

@Component({
  components: {
    CustomButton
  }
})
export default class ActivitiesProgression extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public globalStore = getModule(GlobalStore, this.$store);

  hideActivityPanel() {
    this.activityStore.setCurrentActivity(null);
  }

  beforeMount() {
    this._initProgressManager();
  }

  private _initProgressManager() {
    ProgressPercentManager.init(
      this.globalStore.achievedWords.length,
      this.globalStore.dataWord.length
    );
  }

  public getLevelpath() {
    return require("~/assets/img/progress/" +
      ProgressPercentManager.current!.slug +
      ".svg");
  }

  public activityDescription() {
    const steps = this.getSteps()
    return `Il te reste ${steps} ${Helpers.pluralize('mot', steps)}</strong> à découvrir pour
      passer au niveau ${this.getNext()}`
  }

  public getLevel() {
    return ProgressPercentManager.current!.name;
  }

  public getProgress() {
    return this.globalStore.achievedWords.length;
  }

  public getTotal() {
    return this.globalStore.dataWord.length;
  }

  public getNext() {
    return ProgressPercentManager.next?.name;
  }

  public getSteps() {
    return Math.round(ProgressPercentManager.steps);
  }
}
</script>

<style scoped lang="scss">
.activities-progression {
  background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.activities {
  &-title {
    font-size: 40px;
    color: white;
    position: relative;
    margin-bottom: 20px;
  }
  &-description {
    position: relative;
    color: white;
    margin-bottom: 83px;
  }
  &-cross {
    position: absolute;
    top: -30px;
    left: -20px;
  }
  &-heart {
    position: absolute;
    top: -20px;
    right: -40px;
  }
  &-doodle {
    position: absolute;
    bottom: -10px;
    left: 0;
  }
  &-level {
    width: 150px;
    height: 150px;
    background: linear-gradient(
      144.61deg,
      rgba(255, 255, 255, 0.4) 6.83%,
      rgba(252, 231, 220, 0.2) 30.99%,
      rgba(247, 202, 176, 0.2) 61.41%,
      rgba(243, 173, 133, 0.3) 90.75%
    );
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    margin-bottom: 56px;

    .level-circle-name {
      position: absolute;

      height: 249px;
      width: 249px;

      animation: rotate-center 30s linear infinite both;
    }

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      width: 100%;
      height: 100%;
      border-radius: 50%;

      border-top: 1px solid rgba(255, 255, 255, 0.4);
      border-right: 1px solid rgba(252, 231, 220, 0.2);
      border-bottom: 1px solid rgba(247, 202, 176, 0.2);
      border-left: 1px solid rgba(243, 173, 133, 0.3);
    }

    span {
      text-align: center;
      font-size: 30px;
      color: white;
      line-height: 130%;

      .number {
        font-weight: bold;
        position: relative;
        font-size: 50px;
      }
    }
  }
}

#confetti {
  position: absolute;
  top: 0;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2021-5-9 13:59:22
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation rotate-center
 * ----------------------------------------
 */
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0) scale(1.4);
    transform: rotate(0) scale(1.4);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1.4);
    transform: rotate(360deg) scale(1.4);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0) scale(1.4);
    transform: rotate(0) scale(1.4);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1.4);
    transform: rotate(360deg) scale(1.4);
  }
}
</style>
