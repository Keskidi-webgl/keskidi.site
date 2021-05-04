<template>
  <div class="activities-progression">

    <h1>Bravo t'as progressé</h1>

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

@Component({
  components:{
    CustomButton
  }
})
export default class ActivitiesProgression extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)

  hideActivityPanel(){
    GlobalScene.context.resume()
    this.activityStore.setCurrentActivity(null)
    this.activityStore.hideActivityPanel()
    this.$router.push(this.globalSceneStore.activeObject!.room().fullUrl)
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
