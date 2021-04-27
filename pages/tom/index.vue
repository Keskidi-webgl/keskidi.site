<template>
  <div class="page-container" data-namespace="auth">
    <div v-if="isReady" class="card">
    <div v-if="!this.authStore.isAuth" class="sub-card">
      <h1>Welcome</h1>
      <p class="sub-title">Bienvenue chez mes parents. Mi casa es tu casa.</p>
      <p class="message">Moi c'est Tom j'ai 18 ans...Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..Moi c'est Tom j'ai 18 ans..</p>
      <p class="cta-message">Mais avant ç, laisse ton mail</p>
              <input type="text" v-model="dataFormAuth.email" class="form-control" id="email" placeholder="Ton email">
        <button class="button" @click="auth">C'est parti !</button>
    </div>

<!-- 
      <div v-if="!this.authStore.isAuth">
        <h1>Welcome</h1>
        <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <p>Pour acceder à l’experience, entrez votre adresse mail :</p>
        <input type="text" v-model="dataFormAuth.email" class="form-control" id="email" placeholder="Ton email">
        <button class="button" @click="auth">C'est parti !</button>
      </div>

      <div v-if="this.authStore.isAuth">
        <p class="message">{{ currentFact.content }}</p>
        <button class="button" @click="back()">Retour</button>
        <button class="button" @click="random()">Une autre</button>
      </div>
      -->

    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator';
import {AuthManager, SceneManager} from "~/core/managers";
import {AuthCredential, FunFactElement} from '~/core/types';
import AuthModule from '~/store/auth';

@Component
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
.page-container {
  z-index: 100;
  display: flex;
  align-items: center;
  padding-left: 7vw ;

  .card {
    height: 70vh;
    width: 50%;
    min-width: 600px;
    border-radius: 32px;
    border: 0.5px solid #FFF8EE;
    background-color: rgba(255, 255, 255, .15);  
    backdrop-filter: blur(10px);
    position: relative;
    padding: 32px;

    .sub-card {
      height: 100%;
      width: 100%;
      background-color: rgba(255,255,255, 0.8);
      border-radius: 24px;
      padding: 48px 40px;

      h1 {
        font-style: normal;
        font-weight: bold;
        font-size: 60px;
      }
    }
  }

  // .card {
  //   width: 50%;
  //   background: #F2F2F2;
  //   border-radius: 73px;
  //   padding: 100px 50px;
  //   height: 60vh;

  //   display: flex;
  //   align-items: flex-end;

  //   h1 {
  //     font-family: DM Sans;
  //     font-style: normal;
  //     font-weight: normal;
  //     font-size: 70px;
  //     line-height: 91px;

  //     /* Gray 1 */
  //     color: #333333;
  //   }

  //   p {
  //     font-family: DM Sans;
  //     font-style: normal;
  //     font-weight: normal;
  //     font-size: 20px;
  //     line-height: 26px;

  //     /* Gray 1 */
  //     color: #333333;
  //   }

  //   .message {
  //     margin-bottom: 5vh;
  //   }

  //   input {
  //     border: none;
  //     background-color: white;
  //     padding: 12px 25px;
  //     width: 100%;

  //     font-family: DM Sans;
  //     font-style: normal;
  //     font-weight: normal;
  //     font-size: 24.3174px;
  //     line-height: 32px;

  //     /* Gray 1 */
  //     color: #333333;

  //     &:focus {
  //       outline: none;
  //     }
  //   }

  //   .button {
  //     padding: 8px 13px;
  //     background: #EB5757;
  //     border-radius: 67.147px;
  //     border: none;
  //     width: fit-content;
  //     color: white;
  //     cursor: pointer;

  //     margin-top: 2vh;
  //   }
  // }
}
</style>
