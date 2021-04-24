<template>

  <div class="activity-item activity-3">
    <div class="activity-itemInfos">
      <span>Pour vous, quel objet représente ce mot ?</span>
      <canvas ref="activity_3_tom"  class="activity-3-tom"></canvas>
    </div>

    <div class="activity-itemPractice">
      <h2 class="activity-item--title">S'enjailler ACTIVITE 3</h2>
      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
      <canvas ref="activity_3_objects" class="activity-3-objects"></canvas>

    </div>

    <activity-3-result style="display: none"></activity-3-result>

  </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import activity3Result from "~/components/activity/activity-3/activity-3-result.vue";
import Activity3Result from "~/components/activity/activity-3/activity-3-result.vue";
import Activity_1_0bjectsInitializer from "~/core/utils/initializers/activities/Activity_1_0bjectsInitializer";
import {SceneManager} from "~/core/managers";
import Activity_3_0bjectsInitializer from "~/core/utils/initializers/activities/Activity_3_ObjectsInitializer";
import SceneModule from "~/store/scene";
import Activity_1_TomInitializer from "~/core/utils/initializers/activities/Activity_1_TomInitializer";
import Activity_3_TomInitializer from "~/core/utils/initializers/activities/Activity_3_TomInitializer";

@Component({
  components: {Activity3Result}
})
export default class activity3 extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  public mounted() {
    console.log("activity3")

    /// object scene
    new Activity_3_0bjectsInitializer({canvas: this.$refs.activity_3_objects as HTMLCanvasElement, sceneModule: this.sceneModule}).init()
    SceneManager.ACTIVITY_3_OBJECTS.scene.position.set(0,0,-60)


    // character scene
    new Activity_3_TomInitializer({canvas: this.$refs.activity_3_tom as HTMLCanvasElement, sceneModule: this.sceneModule}).init()
    SceneManager.ACTIVITY_3_TOM.scene.position.set(10,-5,-10)

  }

}
</script>

<style lang="scss">
.activity-3-tom{
  position: absolute;
}
.activity-3-objects{
  position: absolute;
}
</style>
