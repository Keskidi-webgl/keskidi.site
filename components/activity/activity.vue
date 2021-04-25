<template>
  <div class="activity-container">

<!-- composant progress-bar    -->

    <activity1 v-if="activityModule.currentActivity === 0" ></activity1>
    <activity2 v-if="activityModule.currentActivity === 1"></activity2>
    <activity3 v-if="activityModule.currentActivity === 2"></activity3>

<!--    overlay transition -->

    <button @click="goToHome">GO BACK</button>

<!--  components  conclusion progression -->

<!--    <canvas ref="activitycanvas"></canvas>-->
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import activity1 from "~/components/activity/activity-1/activity-1.vue";
import activity2 from "~/components/activity/activity-2/activity-2.vue";
import activity3 from "~/components/activity/activity-3/activity-3.vue";
import {SceneManager} from "~/core/managers";
import ActivityModule from "~/store/activity";
import {ACTIVITY_TYPE} from "~/core/enums";

@Component({
  components:{
    activity1,
    activity2,
    activity3
  }
})
export default class activity extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)

  public mounted() {
    console.log("activity")
    console.log(this.activityModule.currentActivity)
  }
  goToHome(){
    SceneManager.GLOBAL_SCENE.resume()
    this.$router.push("/")
    this.destroyActivities()
  }

  destroyActivities(){

    // destroy activity 1

    SceneManager.ACTIVITY_1_OBJECTS?.destroy()
    SceneManager.ACTIVITY_1_TOM?.destroy()
    // SceneManager.ACTIVITY_1_RESULTS.destroy()

    console.log(this.activityModule.currentActivity)
    // destroy activity 2
    SceneManager.ACTIVITY_2_OBJECTS?.destroy()
    //
    // // destroy activity 3
    SceneManager.ACTIVITY_3_OBJECTS?.destroy()
    SceneManager.ACTIVITY_3_TOM?.destroy()
    // SceneManager.ACTIVITY_3_RESULTS.destroy()

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
