<template>
  <div v-if="isActive" ref="site-loader" class="site-loader">
    <h1 class="big-title site-loader-logo">LOGO</h1>
    <p class="site-loader-expression secondary-font">Tu peux me filer de la moula stp ?</p>

    <CustomButton :class="{disabled: !globalModule.isAppInit}" @click.native="hide" arrow-color="white" color="#000648" :text="text()"></CustomButton>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import GlobalModule from "~/store/global";
import AuthModule from "~/store/auth";
import CustomButton from "~/components/buttons/CustomButton.vue";
import {InteractionPointConfig} from "~/core/types";
import gsap from 'gsap'


@Component({
  components: {
    CustomButton
  }
})
export default class Loader extends Vue {
  @Prop({type: String, required: true}) readonly loadingData!: InteractionPointConfig
  public globalModule: GlobalModule = getModule(GlobalModule, this.$store)
  public authModule: AuthModule = getModule(AuthModule, this.$store)
  public isActive: boolean = true

  text() {
    let text = 'Et c\'est parti !'

    if (!this.globalModule.isAppInit) {
      text = `Chargement ${this.loadingData} %`
    }

    return text
  }

  hide() {
    gsap.to('.site-loader', {
      duration: 2,
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
  display: flex;
  flex-direction: column;
  align-items: center;

  &-logo {
    margin-bottom: 130px;
  }

  &-expression {

  }
}
</style>
