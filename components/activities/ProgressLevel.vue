<template>
  <div class="progress-level">
            <svg
                    v-if="isReady"
        class="progress-ring"
      :height="radius * 2"
      :width="radius * 2"
     >
       <circle
         stroke="white"
         :stroke-dasharray="circumference"
         :style="{ strokeDashoffset: strokeDashoffset() }"
         :stroke-width="stroke"
         fill="transparent"
         :r="normalizedRadius"
         :cx="radius"
         :cy="radius"
      />
    </svg>
      </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'

@Component
export default class ProgressLevel extends Vue {
  @Prop({type: Number, required: true}) readonly percent!: number
  @Prop({type: Number, required: true}) readonly radius!: number
  @Prop({type: Number, required: true}) readonly stroke!: number

  public circumference: number
  public normalizedRadius : number

  public isReady: boolean = false

  public mounted() {
      this.init()
  }

  init() {
    this.normalizedRadius = this.radius - this.stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
    console.log(this.circumference)
    this.isReady = true;
  }

    strokeDashoffset() {
      return this.circumference - this.percent / 100 * this.circumference;
    }

}
</script>

<style lang="scss" scoped>
.progress-level {

    .progress-ring__circle {
      transition: 0.35s stroke-dashoffset;
      // axis compensation
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
}
</style>
