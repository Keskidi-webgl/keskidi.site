<template>
  <div class="activities-keskidico main-font">
    <div class="container">
      <div class="keskidico-logo">
        <img src="~/assets/img/keskidico-logo.svg" alt="" />
      </div>

      <div class="activities-text-container">
        <h1 class="activities-title">
          Retrouve les mots que tu as appris sur ton mobile
          <img
            class="activities-doodle"
            src="~/assets/img/gribouillis_2_blanc.png"
            alt=""
          />
          <img
            class="activities-heart"
            src="~/assets/img/gribouillis_coeur_blanc.png"
            alt=""
          />
          <img
            class="activities-cross"
            src="~/assets/img/gribouillis_croix_blanc.png"
            alt=""
          />
        </h1>

        <p class="activities-description main-font">
          Disponible sur l'<strong>App store</strong> et
          <strong>Google play</strong>
        </p>
      </div>

      <CustomButton
        @click.native="hideActivityPanel"
        arrow-color="#FF6644"
        color="white"
        text="Continuer"
        hoverText="#FF6644"
        class="button"
      ></CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import CustomButton from "~/components/buttons/CustomButton.vue";
import GlobalScene from "~/core/scene/GlobalScene";
import GlobalStore from "~/store/global";

@Component({
  components: {
    CustomButton
  }
})
export default class ActivitiesKeskidico extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public globalStore = getModule(GlobalStore, this.$store);

  hideActivityPanel() {
    this.activityStore.setCurrentActivity(null);
    let progress: HTMLElement | null = document.querySelector(
      ".progress-level"
    );
    progress ? (progress!.style.zIndex = "100") : false;
  }

  mounted() {}
}
</script>

<style scoped lang="scss">
.activities-keskidico {
  background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;

  .container {
    height: 100%;
    max-height: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
.activities {
  &-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &-title {
    font-size: 40px;
    color: white;
    position: relative;
    text-align: center;
  }
  &-description {
    position: relative;
    color: white;
    font-size: 17px;
    text-align: center;
  }
  &-cross {
    position: absolute;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
  }
  &-heart {
    position: absolute;
    top: -20px;
    right: -40px;
  }
  &-doodle {
    position: absolute;
    bottom: -10px;
    left: 0;
  }
}
</style>
