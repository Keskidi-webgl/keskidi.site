<template>
  <ActivityElement class="activity-three">
    <template v-slot:activity-element-aside>
      <h1></h1>
    </template>
    <template v-slot:activity-element-content>
      <h1>Content activity Three</h1>
    </template>
  </ActivityElement>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import ActivityElement from "~/components/activities/ActivityElement.vue";

@Component({
  components: {
    ActivityElement
  }
})
export default class ActivityThree extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)

}
</script>

<style scoped lang="scss">
.activity-three {
}
</style>
