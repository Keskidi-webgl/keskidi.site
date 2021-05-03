<template>
  <div class="activities-result">

    <h1>result</h1>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"

@Component({})
export default class ActivitiesResult extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
}
</script>

<style scoped lang="scss">
.activities-result {

}
</style>
