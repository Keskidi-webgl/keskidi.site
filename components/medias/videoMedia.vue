<template>

  <div class="activity-item--mediasVideo">
    <video class="activity-item--video" controls >
      <source :src="mediaUrl" type="video/mp4">
    </video>
    <p class="activity-item--videoCaption">{{caption}}</p>
  </div>

</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import {SceneManager} from "~/core/managers";
import ActivityTwo0bjectsInitializer from "~/core/utils/initializers/activities/ActivityTwo0bjectsInitializer";
import {ACTIVITY_TYPE} from "~/core/enums";
import ActivityModule from "~/store/activity";

@Component({
})
export default class videoMedia extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  @Prop({type: String, required: true}) readonly mediaUrl!: string
  @Prop({type: String, required: true}) readonly caption!: string
  public mounted() {
    console.log("activity2")

  }

}
</script>

<style lang="scss">
.activity-2-objects{
  position: absolute;
}
</style>
