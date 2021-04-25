<template>

  <div class="activity-item--mediasImg">
    <img class="activity-item--img" :src="mediaUrl" alt="">
    <p class="activity-item--imgCaption">{{caption}}</p>
  </div>

</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import ActivityModule from "~/store/activity";

@Component({
})
export default class imageMedia extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  @Prop({type: String, required: true}) readonly mediaUrl!: string
  @Prop({type: String, required: true}) readonly caption!: string

  public mounted() {
    console.log("activity2")
  }

}
</script>

<style scoped lang="scss">
.activity-item--img{
  border-radius: 8px;
}
</style>
