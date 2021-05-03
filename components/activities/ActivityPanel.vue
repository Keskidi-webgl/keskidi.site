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

    <!-- Activities progression -->
    <ActivitiesProgression v-if="activityDisplay.progression()"/>

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
import Helpers from "~/core/utils/helpers";
import GlobalStore from "~/store/global";
import ActivityThree from "~/components/activities/activity-three/ActivityThree.vue";
import ActivitiesResult from "~/components/activities/activities-result/ActivitiesResult.vue";
import ActivitiesProgression from "~/components/activities/activities-progression/ActivitiesProgression.vue";

@Component({
  components: {
    ActivityThree,
    ActivityOne,
    ActivityTwo,
    ActivityOneResult,
    ActivitiesResult,
    ActivitiesProgression
  }
})
export default class ActivityPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public globalStore = getModule(GlobalStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public activityDisplay = {
    one: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_1,
    two: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_2,
    three: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_3,
    result: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITIES_RESULT,
    progression: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITIES_PROGRESSION
  }

  public mounted() {
    const isWordAchieved = Helpers.isActivityWordAchieved(this.activityStore.dataWord!, this.globalStore.achievedWords)
    this.activityStore.setCurrentActivity(isWordAchieved ? ACTIVITY_TYPE.ACTIVITY_1 : ACTIVITY_TYPE.ACTIVITY_1)
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
