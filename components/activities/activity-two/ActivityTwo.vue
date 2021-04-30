<template>
  <ActivityElement class="activity-two">
    <template v-slot:activity-element-aside>
      <h1></h1>
    </template>
    <template v-slot:activity-element-content>
      <h1>Content activity Two</h1>
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
export default class ActivityTwo extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)

  public async mounted() {
    console.log('mounted activity two')
  }
}
</script>

<style scoped lang="scss">
.activity-two {
}
</style>
