<template>
  <div class="activity-panel">
    <!-- Activity one -->
    <ActivityOne v-if="activityDisplay.one()"/>

    <!-- Activity two -->
    <ActivityTwo v-if="activityDisplay.two()"/>
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

@Component({
  components: {
    ActivityOne,
    ActivityTwo,
    ActivityOneResult
  }
})
export default class ActivityPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public activityDisplay = {
    one: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_1,
    two: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_2
  }

  public mounted() {
    this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_2)
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
