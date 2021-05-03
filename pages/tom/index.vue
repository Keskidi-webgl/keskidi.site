<template>
  <div class="page-container" data-namespace="auth">
    <CustomCard
      v-if="isReady && !displayFunfact"
      class="auth-container"
      background-color="white"
      width="610"
    >
      <img class="doodle" src="~/assets/img/orange-doodles.svg" alt="" />
      <div v-if="step == 1" class="w-100 step">
        <h1 class="big-title main-font w-100 tom-title">Wesh alors !</h1>
        <p class="sub-title text-common secondary-font w-100">
          Bienvenue chez mes parents. Mi casa es tu Casa.
        </p>
        <p class="w-100 main-font">
          Moi, c'est Tom, j'ai 18 ans !
        </p>
        <p class="w-100 main-font">
          Tu trouveras différents mots que j'utilise au quotidien, dissimulés
          dans différentes pièces de ma maison.
        </p>
        <div class="w-100 action-container">
          <CustomButton
            @click.native="next()"
            arrow-color="white"
            color="#000648"
            text="Suivant"
          />
        </div>
      </div>
      <div v-if="step == 2" class="w-100 step step-2">
        <p class="w-100 main-font">
          Pour continuer, j'ai besoin de ton <strong>adresse mail</strong> pour
          que tu puisses garder ta <strong>progression</strong>.
          <span>
            <img
              class="rgpd"
              src="~/assets/img/info_RGPD.svg"
              alt=""
              @click="rgpd()"
            />
          </span>
        </p>
        <p class="w-100 main-font">
          Et puis mes darons ne souhaitent pas laisser rentrer n'importe qui
          chez nous...
        </p>
        <input
          type="text"
          v-model="dataFormAuth.email"
          class="form-control"
          id="email"
          placeholder="Ton email"
        />
        <div class="w-100 action-container">
          <CustomButton
            @click.native="auth()"
            arrow-color="white"
            color="#000648"
            text="Valider"
          />
        </div>
      </div>

      <span class="leave-activity" @click="back()">
        <img src="~/assets/img/cross.svg" alt="" />
      </span>
    </CustomCard>

    <CustomCard
      v-if="isReady && displayFunfact"
      class="fun-container"
      background-color="white"
      width="610"
    >
      <img class="doodle" src="~/assets/img/orange-doodles.svg" alt="" />
      <div class="w-100 step">
        <h1 class="big-title main-font w-100 tom-title">Fun fact !</h1>
        <p class="w-100">{{ currentFact.content }}</p>
        <span class="leave-activity" @click="back()">
          <img src="~/assets/img/cross.svg" alt="" />
        </span>
        <div class="w-100 action-container">
          <CustomButton
            @click.native="random()"
            arrow-color="white"
            color="#000648"
            text="Une autre"
          />
        </div>
      </div>
    </CustomCard>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import { SceneManager } from "~/core/managers";
import { AuthCredential, FunFactElement } from "~/core/types";
import AuthStore from "~/store/auth";
import CustomCard from "~/components/cards/CustomCard.vue";
import CustomButton from "~/components/buttons/CustomButton.vue";
import GlobalScene from "~/core/scene/GlobalScene";
import TomSceneElement from "~/core/scene/TomSceneElement";

@Component({
  components: {
    CustomCard,
    CustomButton
  }
})
export default class AuthPage extends Vue {
  public onProgress: boolean = false;
  public autModule: AuthStore = getModule(AuthStore, this.$store);
  public dataFormAuth: AuthCredential = {
    email: ""
  };
  public isReady: boolean = false;
  public authStore: AuthStore = getModule(AuthStore, this.$store);
  public currentFact: FunFactElement = {
    content: ""
  };
  public funfacts: Array<
    FunFactElement
  > = require("../../core/datas/funfacts.json");
  public step: number = 1;
  public displayFunfact: boolean = this.authStore.isAuth;

  mounted() {
    GlobalScene.context.disableParallax();
    TomSceneElement.playIdleAnimation(GlobalScene.context)
    GlobalScene.context.goToPresetPosition("tom", 2, () => {
      this.isReady = true;
    });

    this.random();
  }

  async auth() {
    if (this.dataFormAuth.email) {
      try {
        await this.autModule.auth(this.dataFormAuth);
        this.back();
      } catch (e) {
        this.onProgress = false;
      }
    }
  }

  beforeDestroy() {
    GlobalScene.context.enableParallax();
    if (!this.autModule.isAuth) {
      TomSceneElement.playHelloAnimation(GlobalScene.context)
    }
  }

  back() {
    this.$router.push("/");
  }

  random() {
    let current = this.currentFact;
    let newFunFact = this.funfacts[
      Math.floor(Math.random() * this.funfacts.length)
    ];
    if (newFunFact != current) this.currentFact = newFunFact;
    else this.random();
  }

  next() {
    this.step++;
  }

  rgpd() {
    // TODO RGPD
    alert("Lien vers rgpd");
  }
}
</script>

<style scoped lang="scss">
.auth-container,
.fun-container {
  z-index: 20;
  position: absolute;
  left: 120px;
  top: 50%;
  transform: translateY(-50%);
  color: $dark-blue;

  .step {
    position: relative;
    z-index: 5;

    .tom-title {
      margin-top: 120px;
    }
  }

  // General
  .doodle {
    position: absolute;
    top: 100px;
    right: 50px;
    z-index: 1;
  }

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
    display: flex;
    justify-content: center;
  }

  .action {
    float: left;
  }
}
.auth-container {
  .step-2 {
    margin-top: 160px;

    .rgpd {
      cursor: pointer;
    }
  }
}
</style>
