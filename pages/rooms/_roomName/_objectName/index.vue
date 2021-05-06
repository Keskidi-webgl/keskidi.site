<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <CustomCard v-if="this.activityStore.dataWord" class="scenario-container" background-color="white" width="460">
      <span v-if="this.activityStore.dataWord.home_scenario" class="scenario-container-text text-common">
        {{ this.activityStore.dataWord.home_scenario.content }}
      </span>
      <CustomButton class="btn-discover" @click.native="startActivity" arrow-color="white" color="#000648"
                    :text="getButtonWord()"></CustomButton>
    </CustomCard>
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
    this.globalSceneStore.setActiveObject(roomObjectSlug)
    console.log(this.globalSceneStore.activeObject)

    this.globalSceneStore.setIsCameraMoving(true)
    GlobalScene.context.goToPresetPosition(roomObjectSlug, 1, () => {
      this.globalSceneStore.setIsCameraMoving(false)
    })
    this._setDataWord()
  }


  public startActivity() {
    this.activityStore.displayActivityPanel()
  }

  public beforeDestroy() {
    this.globalSceneStore.setActiveObject(null)
  }

  public getButtonWord() {
    const isWordAchieved = Helpers.isActivityWordAchieved(this.activityStore.dataWord!, this.globalStore.achievedWords)
    const verb = isWordAchieved ? 'Voir' : 'Découvrir'
    return `${verb} le mot ${this.activityStore.dataWord!.name}`
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
