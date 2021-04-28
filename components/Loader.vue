<template>
  <div v-if="isActive" ref="site-loader" class="site-loader">
    <div class="site-loader-container">
      <LogoMedia class="site-loader-container-logo" theme="#000648"></LogoMedia>
      <p class="site-loader-container-expression secondary-font">
        <img src="~/assets/img/quote.svg" class="quote quote-top" alt="">
        Tu peux me filer de la moula stp ?
        <img src="~/assets/img/quote.svg" class="quote quote-bot" alt="">
      </p>

      <p class="main-font text-common site-loader-container-description">Tu n'as rien compris à cette phrase ? Tu es au bon endroit ! Plonge et part à la
        découverte de la culture des jeunes d'aujourd'hui.</p>

      <CustomButton :class="{disabled: !globalStore.isAppInit}" @click.native="hide" arrow-color="white"
                    color="#000648" :text="text()"></CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import CustomButton from "~/components/buttons/CustomButton.vue";
import gsap from 'gsap'
import LogoMedia from "~/components/medias/LogoMedia.vue";


@Component({
  components: {
    CustomButton,
    LogoMedia
  }
})
export default class Loader extends Vue {
  @Prop({type: String, required: true}) readonly loadingData!: InteractionPointConfig
  public globalStore: GlobalStore = getModule(GlobalStore, this.$store)
  public authStore: AuthStore = getModule(AuthStore, this.$store)
  public isActive: boolean = true

  text() {
    let text = 'Et c\'est parti !'

    if (!this.globalStore.isAppInit) {
      text = `Chargement ${this.loadingData} %`
    }

    return text
  }

  hide() {
    gsap.to('.site-loader', {
      duration: 1,
      autoAlpha: 0,
      onComplete: () => {
        this.isActive = false
      }
    })
  }
}
</script>

<style scoped lang="scss">
.disabled {
  pointer-events: none;
}
.site-loader {

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 920px;
    margin: 0 auto;
    height: 100%;

    &-logo {
      margin-bottom: 130px;
      width: 390px;
    }

    &-expression {
      font-style: normal;
      font-weight: normal;
      font-size: 56px;
      line-height: 70px;
      text-align: center;
      position: relative;

      .quote {
        width: 40px;
        position: absolute;

        &-top {
          left: -50px;
          top: -20px;
        }

        &-bot {
          transform: rotate(-180deg);
          bottom: -20px;
        }
      }
    }

    &-description {
      text-align: center;
      font-size: 24px;
      padding: 100px 0;
    }
  }
}
</style>
