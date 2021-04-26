<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <div @click="canDisplayActivityPanel = true" ref="btn" class="interactive-btn">Découvrir le mot</div>
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

@Component({
  components: {
    ActivityPanel
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
    this.objectIdentifier = <URL_OBJECT_IDENTIFIER>this.$route.params.objectName

    SceneManager.GLOBAL_SCENE.goToPresetPosition(this.objectIdentifier, 1, () => {
    })
  }

  displayActivityPanel() {
    this._setDataWord()
    this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1)
    gsap.to('.activity-container', {
      translateY: 0,
      duration: 1,
      onComplete: () => {
        SceneManager.GLOBAL_SCENE.pause()
      }
    })
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

<style lang="scss">
.interactive-btn {
  display: flex;
  position: absolute;
  z-index: 18;
  top: 30%;
  right: 20%;
  text-decoration: none;
  padding: 20px;
  border-radius: 30px;
  background: red;
  color: white;
  cursor: pointer;
}
</style>
