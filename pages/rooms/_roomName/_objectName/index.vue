<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <nuxt-link class="interactive-points" to="{{}}"></nuxt-link>
    <div ref="btn" class="interactive-btn" >Découvrir le mot</div>
    <activity ref="activity"></activity>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {ACTIVITY_TYPE, URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import activity from "~/components/activity/activity.vue";
import gsap from 'gsap'
import SceneModule from "~/store/scene";
import ActivityModule from "~/store/activity";

@Component({
  components:{
    activity
  }
})
export default class ObjectPage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)

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
    this.displayActivity()
  }

  displayActivity(){
    this.$refs.btn.addEventListener('click',()=>{

      console.log("okokokok")
      gsap.to('.activity-container',{translateY:0,duration:1,onComplete:()=>{
          // PAUSE ON GLOBAL SCENE
          SceneManager.GLOBAL_SCENE.pause()
          // START ACTIVITY 1
          this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1)
        }})
    })
  }

  // switchActivity(){
  //   let activities = document.querySelectorAll('.activity-item')
  //   let btns = document.querySelectorAll('.activity-item--btn')
  //   let currentSlide = 0
  //
  //   activities.forEach((item,index)=>{
  //     btns[index].addEventListener('click',()=>{
  //       item.classList.remove('activity-itemActive')
  //       if (index<2){
  //         // this.$emit(`currentActivity${index+1}`)
  //         this.activityModule.setCurrentActivity(index+1)
  //         console.log(this.activityModule.currentActivity,'<--- current activity index')
  //         activities[index+1].classList.add('activity-itemActive')
  //       }
  //       console.log(item,index)
  //     })
  //   })
  //
  // }

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
  cursor: pointer;
}
</style>
