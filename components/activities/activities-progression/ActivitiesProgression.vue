<template>
  <div class="activities-progression main-font">
    <div class="activities-level">
      <span>{{this.getProgress() }}</span>
      <span>{{this.getTotal() }}</span>
    </div>

    <p class="activities-currentLevel">{{this.getLevel()}}</p>

    <h1 class="activities-title">Bravo t'as progressé
      <img class="activities-doodle" src="~/assets/img/gribouillis_2_blanc.png" alt="">
      <img class="activities-heart" src="~/assets/img/gribouillis_coeur_blanc.png" alt="">
      <img class="activities-cross" src="~/assets/img/gribouillis_croix_blanc.png" alt="">
    </h1>


    <p class="activities-description">Il te reste <strong>{{this.getSteps()}} mots</strong> à découvrir pour passer au niveau {{this.getNext()}}</p>


    <p class="activities-moreInfos" v-if="getProgress() === 0">Tu peux aussi retrouver tes mots sur l'application Keskidico</p>
    <CustomButton
      @click.native="hideActivityPanel"
      arrow-color="#FF6644"
      color="white"
      text="Continuer"
    ></CustomButton>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import CustomButton from "~/components/buttons/CustomButton.vue";
import GlobalScene from "~/core/scene/GlobalScene";
import GlobalStore from "~/store/global";
import {ProgressPercentManager} from "~/core/managers";

@Component({
  components:{
    CustomButton
  }
})
export default class ActivitiesProgression extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public globalStore = getModule(GlobalStore, this.$store)

  hideActivityPanel(){
    GlobalScene.context.resume()
    this.activityStore.setCurrentActivity(null)
    this.activityStore.hideActivityPanel()
    this.$router.push(this.globalSceneStore.activeObject!.room().fullUrl)
  }

  mounted(){
    this._initProgressManager()
  }

  private _initProgressManager() {
    ProgressPercentManager.words = this.globalStore.dataWord.length
    ProgressPercentManager.userAchievedWords = this.globalStore.achievedWords.length

  }

  public getLevel() {
    return ProgressPercentManager.current!.name
  }

  public getProgress() {
    ProgressPercentManager.init()
    return this.globalStore.achievedWords.length
  }

  public getTotal() {
    ProgressPercentManager.init()
    return this.globalStore.dataWord.length
  }

  public getNext() {
    return ProgressPercentManager.next?.name
  }

  public getSteps(){
    return Math.round(ProgressPercentManager.steps)
  }

}
</script>

<style scoped lang="scss">
.activities-progression {
  background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.activities{
  &-title{
    font-size: 40px;
    color: white;
    position: relative;
  }
  &-description{
    position: relative;
    color: white;
  }
  &-cross{
    position: absolute;
    top: -30px;
    left: -20px;
  }
  &-heart{
    position: absolute;
    top: -20px;
    right: -30px;
  }
  &-doodle{
    position: absolute;
    bottom: -10px;
    left: 0;
  }
  &-level{
    width: 150px;
    height: 150px;
    background: white;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span{
      font-size: 30px;
      font-weight: bold;
      color: $orange;
      display: block;
      position: relative;
      &:first-of-type{
        &:after{
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          background: $orange;
        }
      }
    }
  }
}

#confetti{
  position: absolute;
  top: 0;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

</style>
