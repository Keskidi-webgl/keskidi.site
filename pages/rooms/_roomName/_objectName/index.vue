<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <nuxt-link class="interactive-points" to="{{}}"></nuxt-link>
    <div @click="displayActivity" ref="btn" class="interactive-btn">Découvrir le mot</div>
    <activity ref="activity"></activity>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {ACTIVITY_TYPE, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import activity from "~/components/activity/activity.vue";
import gsap from 'gsap'
import SceneModule from "~/store/scene";
import ActivityModule from "~/store/activity";
import AuthMiddleware from "~/middleware/auth";
import {ApiManager, SceneManager} from "~/core/managers";
import GlobalModule from "~/store/global";
import Helpers from "~/core/utils/helpers";

@Component({
  components: {
    activity
  }
})
export default class ObjectPage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)
  public globalModule = getModule(GlobalModule, this.$store)
  public objectIdentifier: string = ''

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

  async displayActivity() {
    this._setDataWord()
    gsap.to('.activity-container', {
      translateY: 0, duration: 1, onComplete: () => {
        // PAUSE ON GLOBAL SCENE
        SceneManager.GLOBAL_SCENE.pause()
        // START ACTIVITY 1
        this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1)
      }
    })

  }

  /**
   * On click of activity button, we update activity store with target word of the activity
   * (expressions, definitions ...)
   */
  private _setDataWord() {
    const dataWord = this.globalModule.dataWord?.find(word => word.id === Helpers.wordIdFromObject(this.objectIdentifier))
    this.activityModule.setDataWord(dataWord)
  }

}
</script>

<style lang="scss">
.interactive-btn {
  display: flex;
  position: absolute;
  z-index: 99;
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
