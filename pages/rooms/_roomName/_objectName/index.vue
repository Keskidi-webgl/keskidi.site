<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <nuxt-link class="interactive-points" to="{{}}"></nuxt-link>
    <div class="interactive-btn" >Découvrir le mot</div>
    <activity></activity>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import activity from "~/components/activity/activity.vue";
import gsap from 'gsap'

@Component({
  components:{
    activity
  }
})
export default class ObjectPage extends Vue {

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
    let activity = document.querySelector('.interactive-btn')

    activity?.addEventListener('click',()=>{

      console.log("okokokok")
      gsap.to('.activity',{translateY:0,duration:1})
    })
  }
}
</script>

<style lang="scss">
.interactive-btn{
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
}
</style>
