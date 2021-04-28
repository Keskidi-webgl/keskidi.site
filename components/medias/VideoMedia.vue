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
import GlobalSceneStore from "~/store/scene";
import ActivityStore from "~/store/activity";

@Component({})
export default class VideoMedia extends Vue {
  @Prop({type: String, required: true}) readonly mediaUrl!: string
  @Prop({type: String, required: true}) readonly caption!: string

  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
}
</script>

<style lang="scss">
.activity-item--video{
  width: 100%;
}
</style>
