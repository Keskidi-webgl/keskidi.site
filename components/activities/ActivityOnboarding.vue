<template>
  <div v-if="activityStore.canDisplayOnboarding" class="activity-panel-onboarding">
    ActivityOnboarding
  </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";

@Component({})
export default class ActivityOnboarding extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
}
</script>

<style scoped lang="scss">
.activity-panel-onboarding {
  background-color: blue;
}
</style>
