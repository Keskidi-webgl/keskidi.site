<template>
  <transition
    v-on:enter="_onEnter"
    v-on:leave="_onLeave">

    <div v-if="activityStore.canDisplayActivityPanel" class="activity-panel">
      <aside>

      </aside>
      <main></main>
    </div>

  </transition>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import {SceneManager} from "~/core/managers"
import ActivityStore from "~/store/activity"
import gsap from "gsap";

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

  private _onEnter(el, done) {
    gsap.to(el, {
      duration: 1,
      autoAlpha: 1,
      onComplete: () => {
        SceneManager.GLOBAL_SCENE.pause()
        done()
      }
    })
  }

  private _onLeave(el) {
    console.log(el)
  }
}
</script>

<style scoped lang="scss">
.activity-panel {
  background-color: green;
  opacity: 0;
}
</style>
