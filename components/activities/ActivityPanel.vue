<template>
  <div class="activity-panel">

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import {SceneManager} from "~/core/managers"
import ActivityStore from "~/store/activity"

@Component({
})

export default class ActivityPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)

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

  }
}
</script>

<style lang="scss">
</style>
