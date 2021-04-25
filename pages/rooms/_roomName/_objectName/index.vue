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
import Helpers from "~/core/utils/helpers";
import {ApiManager, SceneManager} from "~/core/managers";

@Component({
  components: {
    activity
  }
})
export default class ObjectPage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)

  middleware(context: Context) {
    AuthMiddleware.handle(context)
  }

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateObjectPageParam(params.roomName, params.objectName)
  }

  mounted() {
    const objectIdentifier = <URL_OBJECT_IDENTIFIER>this.$route.params.objectName
    SceneManager.GLOBAL_SCENE.goToPresetPosition(objectIdentifier, 1, () => {
    })
  }

  displayActivity() {

    gsap.to('.activity-container', {
      translateY: 0, duration: 1, onComplete: () => {
        // PAUSE ON GLOBAL SCENE
        SceneManager.GLOBAL_SCENE.pause()
        // START ACTIVITY 1
        this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1)
      }
    })

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
