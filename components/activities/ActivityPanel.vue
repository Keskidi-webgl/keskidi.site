<template>
  <div class="activity-container">
    <!-- composant progress-bar    -->
    <ActivityOne v-if="activityModule.currentActivity === 0"></ActivityOne>
    <ActivityTwo v-if="activityModule.currentActivity === 1"></ActivityTwo>
    <ActivityThree v-if="activityModule.currentActivity === 2"></ActivityThree>
    <!--    overlay transition -->
    <span class="leave-activity" @click="goToHome">
      <img src="~/assets/img/cross.svg" alt="">
    </span>
    <!--  components  conclusion progression -->

    <!--
    <section class="activity-page">
      <aside class="activity-page-aside">

      </aside>
      <main class="activity-page-content">

      </main>
    </section>
    -->
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene"
import {SceneManager} from "~/core/managers"
import ActivityModule from "~/store/activity"
import ActivityOne from "~/components/activities/activityOne/ActivityOne.vue"
import ActivityTwo from "~/components/activities/activityTwo/ActivityTwo.vue"
import ActivityThree from "~/components/activities/activityThree/ActivityThree.vue"

@Component({
  components: {
    ActivityOne,
    ActivityTwo,
    ActivityThree
  }
})

export default class ActivityPanel extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)

  /**
   *
   */
  public goToHome() {
    SceneManager.GLOBAL_SCENE.resume()
    this.$router.push("/")
    this.destroyActivities()
  }

  /**
   * Callback when click to cancel cross
   */
  public destroyActivities() {
    SceneManager.ACTIVITY_1_OBJECTS?.destroy()
    SceneManager.ACTIVITY_1_TOM?.destroy()
    SceneManager.ACTIVITY_2_OBJECTS?.destroy()
    SceneManager.ACTIVITY_3_OBJECTS?.destroy()
    SceneManager.ACTIVITY_3_TOM?.destroy()
    this.activityModule.setCurrentActivity(null)
  }
}
</script>

<style lang="scss">
.activity-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: #FFF8EE;
  transform: translateY(100%);

  .leave-activity {
    width: 76px;
    height: 76px;
    position: fixed;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  .activity-page {
    display: flex;
    align-items: stretch;
    height: 100%;

    &-aside {
      width: 30%;
      max-width: 440px;
      background: linear-gradient(107.28deg, #FF6644 29.48%, #FF9D6F 100%);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .word-title {
        font-size: $title-activity;
        color: white;
        text-align: center;
        font-weight: bold;
      }

      .tom-canvas {
        //width: 100% !important;
        //height: 55% !important;
        //max-height: 520px;
        position: absolute;
      }
    }

    &-content {
      overflow-y: scroll;
      flex: 1;
    }
  }
}
.common-text {
  color: #000648;
  font-size: 32px;
  line-height: 48px;
  font-weight: 500;
}
</style>
