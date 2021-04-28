<template>
  <div ref="activityResult" class="activity-3-result">
    <h2 v-if="activityModule.dataWord" class="activity-item--title big-title main-font">Bravo tu as validé le mot
      {{ activityModule.dataWord.name }}</h2>
    <!--
    <canvas class="activityThreeResult-canvas" ref="activityThreeResult"></canvas>
    -->
    <CustomButton @click.native="goBackHome" arrow-color="#FF9D6F" color="white" text="Suivant"></CustomButton>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import ActivityModule from "~/store/activity"
import {ActivityThreeResultCanvasInitializer} from "~/core/utils/initializers/activities/canvas";
import {ApiManager, SceneManager} from "~/core/managers";
import SceneModule from "~/store/scene";
import AuthModule from "~/store/auth";
import GlobalModule from "~/store/global";
import CustomButton from "~/components/buttons/CustomButton.vue";


@Component({
  components: {
    CustomButton
  }
})
export default class ActivityThreeResult extends Vue {
  public activityModule = getModule(ActivityModule, this.$store)
  public sceneModule = getModule(SceneModule, this.$store)
  public authModule = getModule(AuthModule, this.$store)
  public globalModule = getModule(GlobalModule, this.$store)

  public  async mounted() {
    await this._updateUserAchievedWords()
    //this._initCanvasScenes()
  }

  private _initCanvasScenes() {
    (<HTMLCanvasElement>this.$refs.activityThreeResult).width = (<HTMLElement>this.$refs.activityResult).getBoundingClientRect().width;
    (<HTMLCanvasElement>this.$refs.activityThreeResult).height = (<HTMLElement>this.$refs.activityResult).getBoundingClientRect().height;

    new ActivityThreeResultCanvasInitializer({
      wordObjectCanvas: this.$refs.activityThreeResult as HTMLCanvasElement,
      activityModule: this.activityModule
    })
  }

  public goBackHome() {
    SceneManager.GLOBAL_SCENE.resume()
    this.$router.push(this.sceneModule.activeRoom!.fullUrl)
  }

  private async _updateUserAchievedWords() {
    await ApiManager.request({
      method: 'POST',
      url: `/users/${this.authModule.user!.id}/words/${this.activityModule.dataWord!.id}/validate`
    })
    const {data} = await ApiManager.request({
      url: `/users/${this.authModule.user!.id}/words`
    })

    this.globalModule.setUserWordData(data)
  }
}
</script>

<style scoped lang="scss">
.activity-3-result {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(107.28deg, #FF6644 29.48%, #FF9D6F 100%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .activity-item--title {
    color: white;
    padding-bottom: 50px;
  }
}
.activityThreeResult-canvas{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
