<template>

  <div class="activity-item activity-2">
    <div class="activity-itemInfos">
      <span>Pour vous, quel objet représente ce mot ?</span>
      <canvas ref="activity_2_objects" class="activity-2-objects"></canvas>
    </div>

    <div class="activity-itemPractice">
      <h2 class="activity-item--title">{{activityModule.dataWord.name}}</h2>
      <p class="activity-item--phonetic">{{activityModule.dataWord.definition.phonetic}}</p>
      <p class="activity-item--definition">{{activityModule.dataWord.definition.definition}}</p>
      <p class="activity-item--origin">{{activityModule.dataWord.definition.origin}}</p>


      <div class="activity-item--mediaContainer">
        <div class="activity-item--mediasWrapper" v-for="item in activityModule.dataWord.definition.medias">
          <image-media :caption="item.caption" :media-url="item.url" v-if="item.type === 'image'"></image-media>
          <video-media :caption="item.caption" :media-url="item.url" v-if="item.type === 'video'"></video-media>
        </div>
      </div>


      <button @click="nextActivity" ref="nextActivity" class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>
  </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import {SceneManager} from "~/core/managers";
import ActivityTwo0bjectsInitializer from "~/core/utils/initializers/activities/ActivityTwo0bjectsInitializer";
import {ACTIVITY_TYPE} from "~/core/enums";
import ActivityModule from "~/store/activity";
import imageMedia from "~/components/medias/imageMedia.vue";
import videoMedia from "~/components/medias/videoMedia.vue";
@Component({
  components:{
    imageMedia,
    videoMedia
  }
})
export default class activity2 extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  public activityModule = getModule(ActivityModule, this.$store)

  public mounted() {
    console.log("activity2")

    new ActivityTwo0bjectsInitializer({canvas: this.$refs.activity_2_objects as HTMLCanvasElement, sceneModule: this.sceneModule}).init()
    SceneManager.ACTIVITY_2_OBJECTS.scene.position.set(0,0,-60)
  }
  nextActivity(){
    this.activityModule.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_3)
  }

  beforeDestroy(){
    SceneManager.ACTIVITY_2_OBJECTS.destroy()

    console.log("before destroy act 2")
  }

}
</script>

<style scoped lang="scss">
.activity-itemPractice{
  overflow-y: scroll;
}
.activity-2-objects{
  position: absolute;
}
</style>
