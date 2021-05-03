<template>
  <div class="activity-panel">
    <!-- Activity one -->
    <ActivityOne v-if="activityDisplay.one()"/>

    <!-- Activity two -->
    <ActivityTwo v-if="activityDisplay.two()"/>

    <!-- Acitivity three   -->
    <ActivityThree v-if="activityDisplay.three()"/>

    <!-- Activities result -->
    <ActivitiesResult v-if="activityDisplay.result()"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import ActivityOne from "~/components/activities/activity-one/ActivityOne.vue";
import {ACTIVITY_TYPE} from "~/core/enums";
import ActivityTwo from "~/components/activities/activity-two/ActivityTwo.vue";
import GlobalScene from "~/core/scene/GlobalScene";
import ActivityOneResult from "~/components/activities/activity-one/ActivityOneResult.vue";
import ActivityThree from "~/components/activities/activity-three/ActivityThree.vue";
import ActivitiesResult from "~/components/activities/activities-result/ActivitiesResult.vue";

@Component({
  components: {
    ActivityThree,
    ActivityOne,
    ActivityTwo,
    ActivityOneResult,
    ActivitiesResult
  }
})
export default class ActivityPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public activityDisplay = {
    one: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_1,
    two: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_2,
    three: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_3,
    result: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITIES_RESULT
  }

  public mounted() {
    this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITIES_RESULT)
  }

  public goToHome() {
    GlobalScene.context.resume()
    this.$router.push("/")
  }
}
</script>

<style scoped lang="scss">
.activity-panel {
  //background-color: #FFF8EE;
}
</style>
