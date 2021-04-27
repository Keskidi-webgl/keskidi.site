<template>
  <div ref="activityResult" class="activity-3-result">
    <h2 v-if="activityModule.dataWord" class="activity-item--title">Bravo tu as validé le mot
      {{ activityModule.dataWord.name }}</h2>
    <canvas class="activityThreeResult-canvas" ref="activityThreeResult"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import ActivityModule from "~/store/activity"
import {ActivityThreeResultCanvasInitializer} from "~/core/utils/initializers/activities/canvas";
import {SceneManager} from "~/core/managers";


@Component({})
export default class ActivityThreeResult extends Vue {
  public activityModule = getModule(ActivityModule, this.$store)

  // public created() {
  //   this._resetGltfObjectVisibility()
  // }

  public mounted() {
    this._initCanvasScenes()
  }

  // private _resetGltfObjectVisibility() {
  //   SceneManager.ACTIVITY_3_OBJECTS.setObjectVisibility([
  //     this.activityModule.dataWord!.activity_data!.good_object
  //   ])
  // }

  private _initCanvasScenes() {
    (<HTMLCanvasElement>this.$refs.activityThreeResult).width = (<HTMLElement>this.$refs.activityResult).getBoundingClientRect().width;
    (<HTMLCanvasElement>this.$refs.activityThreeResult).height = (<HTMLElement>this.$refs.activityResult).getBoundingClientRect().height;

    new ActivityThreeResultCanvasInitializer({
      wordObjectCanvas: this.$refs.activityThreeResult as HTMLCanvasElement,
      activityModule: this.activityModule
    })
  }
}
</script>

<style scoped lang="scss">
.activity-3-result {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: red;
  z-index: 10;
}
.activityThreeResult-canvas{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
