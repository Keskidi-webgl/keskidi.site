<template>

  <div class="activity-1-resultWrapper">
    <h2 class="activity-item--title">Selection: {{userSelection.name}}</h2>
    <h2 class="activity-item--title">Result: {{getUserResult()}}</h2>
    <button @click="goToNextActivity" ref="nextActivity" class="activity-item--btn"> ACTIVITE SUIVANTE</button>

    <canvas class="activity-1-result"></canvas>
  </div>

</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import {UserObjectSelection} from "~/core/types"
import {ACTIVITY_TYPE} from "~/core/enums"
import ActivityModule from "~/store/activity"
import {SceneManager} from "~/core/managers"


@Component({})
export default class ActivityOneResult extends Vue {
  @Prop({type: Object, required: true}) readonly userSelection!: UserObjectSelection
  @Prop({type: String, required: true}) readonly goodObject!: string

  public activityModule = getModule(ActivityModule, this.$store)

  public created() {
    this._resetGltfObjectVisibility()
  }

  /**
   * Callback when click to the continue button
   */
  public goToNextActivity() {
    this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_2)
  }

  /**
   * Return result of user selection (vrai or faux)
   */
  public getUserResult() {
    return (this.userSelection.name === this.goodObject) ? 'vrai' : 'faux'
  }

  /**
   * We need to reset visible property of all gltf of the previous scene (activity one)
   */
  private _resetGltfObjectVisibility() {
    SceneManager.ACTIVITY_1_OBJECTS.setObjectVisibility([
      this.activityModule.dataWord!.activity_data!.object_one,
      this.activityModule.dataWord!.activity_data!.object_two,
      this.activityModule.dataWord!.activity_data!.object_three,
    ])
  }
}
</script>

<style lang="scss">
.activity{
  &-container{
    position: absolute;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: white;
    top: 0;
    transform: translateY(100%);
    padding: 2.5rem;
    overflow: hidden;
  }
  &-item{
    width: 100%;
    height: 100%;
    display: none;
    &--title{
      font-size: 6rem;
    }
    &--btn{
      padding: 20px;
      background: red;
      z-index: 999;
    }
  }
  &-itemActive{
    display: flex;
    flex-direction: column;
  }
}
</style>
