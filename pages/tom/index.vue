<template>
  <div class="page-container" data-namespace="auth">
    <div v-if="isReady" class="card">
      <div v-if="!this.authStore.isAuth">
        <h1>Welcome</h1>
        <p class="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <p>Pour acceder à l’experience, entrez votre adresse mail :</p>
        <input type="text" v-model="dataFormAuth.email" class="form-control" id="email" placeholder="Ton email">
        <button class="button" @click="auth()">C'est parti !</button>
      </div>
      <div v-if="this.authStore.isAuth">
        <p class="message">{{ currentFact.content }}</p>
        <button class="button" @click="back()">Retour</button>
        <button class="button" @click="random()">Une autre</button>
      </div>
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
        await AuthManager.auth(this.dataFormAuth)
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
    width: 50%;
    background: #F2F2F2;
    border-radius: 73px;
    padding: 100px 50px;
    height: 60vh;

    display: flex;
    align-items: flex-end;

    h1 {
      font-family: DM Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 70px;
      line-height: 91px;

      /* Gray 1 */
      color: #333333;
    }

    p {
      font-family: DM Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 26px;

      /* Gray 1 */
      color: #333333;
    }

    .message {
      margin-bottom: 5vh;
    }

    input {
      border: none;
      background-color: white;
      padding: 12px 25px;
      width: 100%;

      font-family: DM Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 24.3174px;
      line-height: 32px;

      /* Gray 1 */
      color: #333333;

      &:focus {
        outline: none;
      }
    }

    .button {
      padding: 8px 13px;
      background: #EB5757;
      border-radius: 67.147px;
      border: none;
      width: fit-content;
      color: white;
      cursor: pointer;

      margin-top: 2vh;
    }
  }
}
</style>
