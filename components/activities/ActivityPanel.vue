<template>
  <div class="activity-container">
    <!-- composant progress-bar    -->
    <ActivityOne v-if="activityModule.currentActivity === 0"></ActivityOne>
    <ActivityTwo v-if="activityModule.currentActivity === 1"></ActivityTwo>
    <ActivityThree v-if="activityModule.currentActivity === 2"></ActivityThree>
    <!--    overlay transition -->
    <button @click="goToHome">GO BACK</button>
    <!--  components  conclusion progression -->
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
.activity{
  &-container{
    position: absolute;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: white;
    top: 0;
    transform: translateY(100%);
    padding: 2.5rem;
    overflow: hidden;
  }
  &-item{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    &--title{
      font-size: 6rem;
    }
    &--btn{
      padding: 20px;
      background: red;
      z-index: 999;
    }
  }
}
</style>
