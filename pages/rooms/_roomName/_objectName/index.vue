<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <transition v-on:enter="enterAnimScenarioCard">
      <CustomCard v-if="activityStore.dataWord && canDisplayScenarioCard" class="scenario-container"
                  background-color="white" width="460">
      <span v-if="activityStore.dataWord.home_scenario" class="scenario-container-text text-common">
        {{ activityStore.dataWord.home_scenario.content }}
      </span>
        <CustomButton class="btn-discover" @click.native="startActivity" arrow-color="white" color="#000648"
                      :text="getButtonWord()"></CustomButton>
      </CustomCard>
    </transition>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import AuthMiddleware from "~/middleware/auth";
import GlobalStore from "~/store/global";
import ActivityPanel from "~/components/activities/ActivityPanel.vue";
import CustomCard from "~/components/cards/CustomCard.vue";
import CustomButton from "~/components/buttons/CustomButton.vue";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import Helpers from "~/core/utils/helpers";
import GlobalSceneHelper from "~/core/config/global-scene/GlobalSceneHelper";
import gsap from 'gsap'
import CustomEase from "gsap/CustomEase";

@Component({
  components: {
    ActivityPanel,
    CustomCard,
    CustomButton
  }
})
export default class ObjectPage extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public globalStore = getModule(GlobalStore, this.$store)
  public canDisplayActivityPanel = false
  public canDisplayScenarioCard = false

  middleware(context: Context) {
    AuthMiddleware.handle(context)
  }

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateRoomObjectSlug(<ROOM_SLUG>params.roomName, <ROOM_OBJECT_SLUG>params.objectName)
  }

  async mounted() {
    const roomObjectSlug = <ROOM_OBJECT_SLUG>this.$route.params.objectName
    const object = GlobalSceneHelper.getRoomObjectBySlug(roomObjectSlug)
    this.globalSceneStore.setActiveObject(roomObjectSlug)
    this.globalSceneStore.setIsCameraMoving(true)
    if (object.animation) {
      object.animation()
    }
    GlobalScene.context.goToPresetPosition(roomObjectSlug, 2, () => {
      this.globalSceneStore.setIsCameraMoving(false)
      this.canDisplayScenarioCard = true
    })
    this._setDataWord()
  }

  public startActivity() {
    this.activityStore.displayActivityPanel()
  }

  public beforeDestroy() {

  }

  public getButtonWord() {
    const isWordAchieved = Helpers.isActivityWordAchieved(this.activityStore.dataWord!, this.globalStore.achievedWords)
    const verb = isWordAchieved ? 'Voir' : 'Découvrir'
    return `${verb} le mot ${this.activityStore.dataWord!.name}`
  }

  public enterAnimScenarioCard(el: Element, done: Function) {
    CustomEase.create("container", "M0,0 C0.89,0 0.24,1 1,1 ");
    CustomEase.create("scenarioText", "M0,0 C0.61,0 0.3,1 1,1 ")
    const tl = gsap.timeline()
    tl.from(el, {
      scale: 0,
      duration: 0.7,
      ease: 'container'
    }, 0)
    .from([
      el.querySelector('.scenario-container-text'),
      el.querySelector('.btn-discover')
    ], {
      duration: 0.7,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'scenarioText'
    }, '-=0.4')
  }

  transition() {
    return {
      leave:(el: Element, done: Function) => {
        const tl = gsap.timeline({
          onComplete: () => {
            done()
          }
        })
        tl.to(el.querySelector('.scenario-container'), {
          autoAlpha: 0,
          duration: 0.7,
        })
      }
    }
  }

  /**
   * On click of activity button, we update activity store with target word of the activity
   * (expressions, definitions ...)
   */
  private _setDataWord() {
    const dataWord = this.globalStore.dataWord!.find(word => {
      return word.id === this.globalSceneStore.activeObject!.wordId
    })!
    this.activityStore.setDataWord(dataWord)
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
