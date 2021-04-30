<template>
  <transition
    v-on:enter="_onEnter"
    v-on:leave="_onLeave">

    <div class="activities-result">
      <aside>

      </aside>
      <main></main>
    </div>

  </transition>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"

@Component({})
export default class ActivitiesResult extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)


  /**
   * Callback when click to cancel cross
   */
  public destroyActivities() {

  }

  private _onEnter(el, done) {
  }

  private _onLeave(el) {

  }
}
</script>

<style scoped lang="scss">

</style>
