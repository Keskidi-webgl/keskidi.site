<template>

  <div class="activity-item activity-2">
    <div class="activity-itemInfos">
      <span>Pour vous, quel objet représente ce mot ?</span>
      <canvas ref="activity_2_objects" class="activity-2-objects"></canvas>
    </div>

    <div class="activity-itemPractice">
      <h2 class="activity-item--title">S'enjailler ACTIVITE 2</h2>
      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>
  </div>



</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import Activity_1_0bjectsInitializer from "~/core/utils/initializers/activities/Activity_1_0bjectsInitializer";
import {SceneManager} from "~/core/managers";
import Activity_2_0bjectsInitializer from "~/core/utils/initializers/activities/Activity_2_ObjectsInitializer";

@Component({
})
export default class activity2 extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  public mounted() {
    console.log("activity2")

    /// object scene
    new Activity_2_0bjectsInitializer({canvas: this.$refs.activity_2_objects as HTMLCanvasElement, sceneModule: this.sceneModule}).init()
    SceneManager.ACTIVITY_2_OBJECTS.scene.position.set(0,0,-60)
  }

}
</script>

<style lang="scss">
.activity-2-objects{
  position: absolute;
}
</style>
