<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <CustomCard v-if="this.activityModule.dataWord" class="scenario-container" background-color="white" width="460">
      <span v-if="this.activityModule.dataWord.home_scenario" class="scenario-container-text text-common">
        {{ this.activityModule.dataWord.home_scenario.content }}
      </span>
      <CustomButton class="btn-discover" @click.native="canDisplayActivityPanel = true" arrow-color="white" color="#000648"
                    :text="`Découvrir le mot ${activityModule.dataWord.name}`"></CustomButton>
    </CustomCard>
    <transition v-on:enter="displayActivityPanel">
      <ActivityPanel v-if="canDisplayActivityPanel" ref="activityPanel"></ActivityPanel>
    </transition>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {ACTIVITY_TYPE, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import gsap from 'gsap'
import SceneModule from "~/store/scene";
import ActivityModule from "~/store/activity";
import AuthMiddleware from "~/middleware/auth";
import {SceneManager} from "~/core/managers";
import GlobalModule from "~/store/global";
import Helpers from "~/core/utils/helpers";
import ActivityPanel from "~/components/activities/ActivityPanel.vue";
import CustomCard from "~/components/cards/CustomCard.vue";
import CustomButton from "~/components/buttons/CustomButton.vue";

@Component({
  components: {
    ActivityPanel,
    CustomCard,
    CustomButton
  }
})
export default class ObjectPage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  public globalModule = getModule(GlobalModule, this.$store)
  public objectIdentifier: string = ''
  public canDisplayActivityPanel = false

  middleware(context: Context) {
    AuthMiddleware.handle(context)
  }

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateObjectPageParam(params.roomName, params.objectName)
  }

  async mounted() {
    const objectIdentifier = <URL_OBJECT_IDENTIFIER>this.$route.params.objectName
    this.objectIdentifier = objectIdentifier
    this.sceneModule.setActiveObject(objectIdentifier)
    SceneManager.GLOBAL_SCENE.goToPresetPosition(this.objectIdentifier, 1)
    this._setDataWord()
  }

  public displayActivityPanel() {
    this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1)
    gsap.to('.activity-container', {
      translateY: 0,
      duration: 1,
      onComplete: () => {
        SceneManager.GLOBAL_SCENE.pause()
      }
    })
  }

  public beforeDestroy() {
    this.sceneModule.setActiveObject(null)
  }

  /**
   * On click of activity button, we update activity store with target word of the activity
   * (expressions, definitions ...)
   */
  private _setDataWord() {
    const dataWord = this.globalModule.dataWord!.find(word => {
      return word.id === Helpers.wordIdFromObject(<URL_OBJECT_IDENTIFIER>this.objectIdentifier)
    })!
    this.activityModule.setDataWord(dataWord)
  }
}
</script>

<style scoped lang="scss">
.scenario-container {
  z-index: 20;
  position: absolute;
  right: 120px;
  top: 50%;
  transform: translateY(-50%);

  &-text {
    opacity: 0.6;
    color: #000648;
    padding-bottom: 25px;
    font-family: $main_font;
  }

  .btn-discover {
    width: 280px;
  }

}
</style>
