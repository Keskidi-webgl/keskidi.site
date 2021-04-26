<template>

  <div class="activity-item--mediasImg">
    <img class="activity-item--img" :src="mediaUrl" alt="">
    <p class="activity-item--imgCaption">{{caption}}</p>
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'

@Component({})
export default class ImageMedia extends Vue {
  @Prop({type: String, required: true}) readonly mediaUrl!: string
  @Prop({type: String, required: true}) readonly caption!: string
}
</script>

<style scoped lang="scss">
.activity-item--img{
  border-radius: 8px;
  width: 100%;
}
</style>
