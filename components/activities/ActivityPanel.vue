<template>
  <transition
    v-on:enter="_onEnter"
    v-on:leave="_onLeave">

    <div v-if="activityStore.canDisplayActivityPanel" class="activity-panel">
      ActivityPanel
    </div>

  </transition>
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

  private _onEnter(el) {
    console.log(el)
  }

  private _onLeave(el) {
    console.log(el)
  }
}
</script>

<style lang="scss">
</style>
