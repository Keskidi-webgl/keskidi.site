<template>

    <!--    composant activité 1-->
    <div class="activity-item activity-1">
      <div class="activity-itemInfos">
        <span>Pour vous, quel objet représente ce mot ?</span>
        <canvas ref="activity_1_tom"  class="activity-1-tom"></canvas>
      </div>

      <div class="activity-itemPractice">
        <h2 class="activity-item--title">S'enjailler</h2>
        <button @click="nextActivity" ref="nextActivity" class="activity-item--btn"> ACTIVITE SUIVANTE</button>
        <canvas ref="activity_1_objects" class="activity-1-objects"></canvas>

      </div>



      <activity1-result style="display: none"></activity1-result>
      <!--    composant enfant activité   overlay resultat avec le canvas cuisse de poulet -->
    </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import activity1Result from "~/components/activity/activity-1/activity-1-result.vue";
import SceneModule from "~/store/scene";
import Activity_1_0bjectsInitializer from "~/core/utils/initializers/activities/Activity_1_0bjectsInitializer";
import {SceneManager} from "~/core/managers";
import Activity_1_TomInitializer from "~/core/utils/initializers/activities/Activity_1_TomInitializer";
import ActivityModule from "~/store/activity";
import {ACTIVITY_TYPE} from "~/core/enums";

@Component({
  components:{
    activity1Result
  }
})
export default class activity1 extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)

  public mounted() {
    console.log("activity1")

    // START ACTIVITY CANVAS
    /// object scene
    new Activity_1_0bjectsInitializer({canvas: this.$refs.activity_1_objects as HTMLCanvasElement, sceneModule: this.sceneModule}).init()
    SceneManager.ACTIVITY_1_OBJECTS.scene.position.set(0,0,-60)

    // character scene
    new Activity_1_TomInitializer({canvas: this.$refs.activity_1_tom as HTMLCanvasElement, sceneModule: this.sceneModule}).init()
    SceneManager.ACTIVITY_1_TOM.scene.position.set(10,-2,-2)

    // console.log(SceneManager.ACTIVITY_1_TOM.scene)
  }

  nextActivity(){
    this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_2)

  }

  beforeDestroy(){
    console.log("before destroy act 1")

    SceneManager.ACTIVITY_1_TOM.destroy()
    SceneManager.ACTIVITY_1_OBJECTS.destroy()
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
  &-itemInfos{
    width: 30%;
    height: 100%;
    background: linear-gradient(107.28deg, #FF6644 29.48%, #FF9D6F 100%);
    position: relative;
    .activity-1-tom{
      position: absolute;
    }
  }
  &-itemPractice{
    width: 70%;
    height: 100%;
    position: relative;
    .activity-1-objects{
      position: absolute;
    }

  }
  &-item{
    width: 100%;
    height: 100%;
    display: none;
    &--title{
      font-size: 6rem;
    }
    &--btn{
      padding: 20px;
      background: red;
      z-index: 999;
      position: fixed;
      top: 30px;
      width: 100px;
    }
  }
  &-itemActive{
    display: flex;
    flex-direction: row!important;
  }

}
</style>
