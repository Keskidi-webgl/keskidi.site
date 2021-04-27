<template>
  <div class="activity-1-resultWrapper">
    <div class="marqueeWrapper">
      <span v-for="item in marqueeNumber">{{getUserResult()}}</span>
    </div>
    <canvas class="activityOneResult" ref="activityOneResult"></canvas>

    <custom-button @click.native="goToNextActivity" class="activity-result--btn"  color="white" text="Continuer" arrow-color="#FF7651"></custom-button>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import {UserObjectSelection} from "~/core/types"
import {ACTIVITY_TYPE} from "~/core/enums"
import ActivityModule from "~/store/activity"
import {SceneManager} from "~/core/managers"
import {ActivityOneResultCanvasInitializer} from "~/core/utils/initializers/activities/canvas";
import CustomButton from "~/components/buttons/CustomButton.vue";


@Component({
  components:{
    CustomButton
  }
})
export default class ActivityOneResult extends Vue {
  @Prop({type: Object, required: true}) readonly userSelection!: UserObjectSelection
  @Prop({type: String, required: true}) readonly goodObject!: string

  private marqueeNumber:number = 6
  public activityModule = getModule(ActivityModule, this.$store)

  public created() {
    this._resetGltfObjectVisibility()
  }

  public mounted() {
    this._initCanvasScenes()
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

  /**
   * Init canvas of activity
   */
  private _initCanvasScenes() {
    (<HTMLCanvasElement>this.$refs.activityOneResult).width = window.innerWidth;
    (<HTMLCanvasElement>this.$refs.activityOneResult).height = window.innerHeight;

    new ActivityOneResultCanvasInitializer({
      wordObjectCanvas: this.$refs.activityOneResult as HTMLCanvasElement,
      activityModule: this.activityModule
    }).init()
  }
}
</script>

<style lang="scss">

.activity-1-resultWrapper {
  position: absolute;
  background: $orange-gradient;
  width: 100%;
  height: 100%;
  z-index: 60;
  .marqueeWrapper{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    span{
      font-size: 120px;
      font-family: "TTNormsPro";
      font-weight: bold;
      text-transform: uppercase;
      color: white;
    }
  }
  .activityOneResult{
    z-index: 3;
  }
  .activity-result--btn{
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
