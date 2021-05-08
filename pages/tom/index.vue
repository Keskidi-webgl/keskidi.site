<template>
  <div class="page-container" data-namespace="auth">
    <transition v-on:enter="enterAnimSCard">
      <CustomCard
        v-if="isReady && !displayFunfact"
        class="auth-container"
        background-color="white"
        width="610"
      >
        <div v-if="step == 1" class="w-100 step">
          <h1 class="big-title main-font w-100 tom-title">
            Wesh alors !
            <img
              src="~/assets/img/arrow-draft-one.png"
              class="doodle bottom-left-arrow"
              alt=""
            />
            <img
              src="~/assets/img/arrow-draft-two.png"
              class="doodle top-left-arrow"
              alt=""
            />
            <img
              src="~/assets/img/doodle-packed.png"
              class="doodle packed-doodle"
              alt=""
            />
          </h1>
          <p class="sub-title text-common secondary-font w-100">
            Moi, c'est Tom, j'ai 18 ans !
          </p>
          <p class="w-100 main-font">
            Bienvenue chez mes parents.
          </p>
          <p class="w-100 main-font">
            Je te propose un jeu pour découvrir un langage que notre génération
            utilise au quotidien et que tu peines parfois à comprendre !
          </p>
          <p class="w-100 main-font">
            Des mots sont dissimulés dans chaque pièce de ma maison.
            <strong>Clique</strong> sur l'une d'entre elle pour commencer
            l'aventure...
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
            Pour continuer, j'ai besoin de ton <strong>adresse mail</strong> afin
            que tu puisses garder ta
            <strong class="progression"
            >progression
              <img
                src="~/assets/img/circle-doodle-two.png"
                class="doodle circle-doodle"
                alt=""/></strong
            >.
            <span>
            <nuxt-link to="/rgpd" class="rgpd">
              <img src="~/assets/img/info_RGPD.svg" alt="" />
            </nuxt-link>
          </span>
            <img
              src="~/assets/img/doodle-line.png"
              class="doodle line-doodle"
              alt=""
            />
          </p>
          <p class="w-100 main-font">
            Et puis ... mes darons ne souhaitent pas laisser rentrer n'importe qui
            chez nous. 😉
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
        <div class="w-100 step">
          <h1 class="big-title main-font w-100 tom-title">
            Fun fact !
            <img
              src="~/assets/img/doodle-packed-large.png"
              class="doodle packed-doodle-large"
              alt=""
            />
          </h1>
          <p class="w-100 main-font">{{ currentFact.content }}</p>
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
    </transition>

  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import { AuthCredential, FunFactElement } from "~/core/types";
import AuthStore from "~/store/auth";
import CustomCard from "~/components/cards/CustomCard.vue";
import CustomButton from "~/components/buttons/CustomButton.vue";
import GlobalScene from "~/core/scene/GlobalScene";
import TomSceneElement from "~/core/scene/TomSceneElement";
import gsap from "gsap";

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
    GlobalScene.context.disableParallax()
    if (!TomSceneElement.activeAnimationAction || TomSceneElement.activeAnimationAction.name !== 'idle') {
      TomSceneElement.playAnimation("idle", GlobalScene.context)
    }
    
    GlobalScene.context.goToPresetPosition("tom", 2, () => {
      this.isReady = true
    });

    this.random();
  }

  async auth() {
    if (this.dataFormAuth.email) {
      try {
        await this.autModule.auth(this.dataFormAuth);
        this.back()
      } catch (e) {
        this.onProgress = false;
      }
    }
  }

  beforeDestroy() {
    GlobalScene.context.enableParallax();
    if (!this.autModule.isAuth) {
      TomSceneElement.playAnimation("hello", GlobalScene.context)
    }
  }

  back() {
    this.$router.push("/");
  }

  random() {
    let current = this.currentFact;
    let newFunFact = this.funfacts[
      Math.floor(Math.random() * this.funfacts.length)
    ]
    if (newFunFact != current) this.currentFact = newFunFact
    else this.random()
  }

  next() {
    this.step++;
  }

  public enterAnimSCard(el: Element, done: Function) {
    const tl = gsap.timeline()
    tl.from(el, {
      opacity: 0,
      duration: 1
    })
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
      margin: 30px 0;
      position: relative;
      width: fit-content;

      .doodle {
        position: absolute;
        z-index: -1;

        &.bottom-left-arrow {
          bottom: -25px;
          left: 25px;
        }

        &.top-left-arrow {
          top: -25px;
          left: -30px;
        }

        &.packed-doodle {
          right: 125px;
          bottom: -10px;
        }

        &.packed-doodle-large {
          right: 0;
          top: 0;
        }
      }
    }
  }

  // General
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

  p {
    font-size: 24px;
  }
}
.auth-container {
  .step-2 {
    margin-top: 70px;

    .progression,
    p {
      position: relative;
      // z-index: 5;
    }

    .doodle {
      position: absolute;
      z-index: -1;

      &.line-doodle {
        left: 30px;
        top: 30px;
      }

      &.circle-doodle {
        left: 0;
        bottom: -5px;
      }
    }

    .rgpd {
      cursor: pointer;
    }
  }
}
</style>
