<template>
  <div class="page-container" data-namespace="auth">

    <CustomCard v-if="isReady && !this.authStore.isAuth" class="auth-container" background-color="white" width="610">
      <h1 class="big-title main-font w-100">Wesh alors !</h1>
      <p class="sub-title text-common secondary-font w-100">Bienvenue chez mes parents. Mi casa es tu Casa.</p>
      <p class="w-100 main-font">Je me présente rapidement. Moi, c'est Tom, j'ai 18 ans ! J'adore jouer aux jeux vidéos, faire du skate et de la muscu.</p>
      <p class="w-100 main-font">Je ne laisse pas n'importe qui rentrer chez moi. J'ai donc besoin que tu me donne ton email 😀</p>
      <input type="text" v-model="dataFormAuth.email" class="form-control" id="email" placeholder="Ton email">
      <div class="w-100 action-container">
        <CustomButton @click.native="auth()" arrow-color="white" color="#000648" text="Valider"/>
      </div>
      <span class="leave-activity" @click="back()">
        <img src="~/assets/img/cross.svg" alt="">
      </span>
    </CustomCard>

    <CustomCard v-if="isReady && this.authStore.isAuth" class="auth-container" background-color="white" width="610">
      <p class="w-100">{{ currentFact.content }}</p>
      <span class="leave-activity" @click="back()">
        <img src="~/assets/img/cross.svg" alt="">
      </span>
      <div class="w-100 action-container">
        <CustomButton @click.native="random()" arrow-color="white" color="#000648" text="Une autre"/>
      </div>
    </CustomCard>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator';
import {AuthManager, SceneManager} from "~/core/managers";
import {AuthCredential, FunFactElement} from '~/core/types';
import AuthModule from '~/store/auth';
import CustomCard from "~/components/cards/CustomCard.vue";
import CustomButton from "~/components/buttons/CustomButton.vue";

@Component({
  components: {
    CustomCard,
    CustomButton
  }
})
export default class AuthPage extends Vue {
  public onProgress: boolean = false
  public autModule: AuthModule = getModule(AuthModule, this.$store)
  public dataFormAuth: AuthCredential = {
    email: ''
  }
  public isReady: boolean = false
  public authStore: AuthModule = getModule(AuthModule, this.$store)
  public currentFact: FunFactElement = {
    content: ''
  }
  public funfacts: Array<FunFactElement> = require('../../core/datas/funfacts.json')

    mounted() {
      SceneManager.GLOBAL_SCENE.goToPresetPosition('tom', 2, () => {
        this.isReady = true;
      })

      this.random()
    }

  async auth() {
    if (this.dataFormAuth.email) {
      try {
        await this.autModule.auth(this.dataFormAuth)
        this.back()
      } catch (e) {
        this.onProgress = false
      }
    }
  }

  back() {
    this.$router.push('/');
  }

  random() {
    this.currentFact = this.funfacts[Math.floor(Math.random() * this.funfacts.length)]
  }
}
</script>

<style scoped lang="scss">
.auth-container {
  z-index: 20;
  position: absolute;
  left: 120px;
  top: 50%;
  transform: translateY(-50%);
  color: $dark-blue;

  .leave-activity {
    width: 76px;
    height: 76px;
    position: fixed;
    top: 50px;
    right: 10px;
    cursor: pointer;
  }

  .sub-title {
    font-size: 24px;
    opacity: 0.6;
  }

  .action-container {
    padding-top: 24px;
  }

  .action {
    float: left;
  }
}
</style>
