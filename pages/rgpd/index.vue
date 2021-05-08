<template>
  <div class="page-container" data-namespace="rgpd-page">
    <!-- About link -->
    <nuxt-link to="/about" class="activity-panel--about">
      A propos
    </nuxt-link>
    <!-- Leave about page -->
    <nuxt-link to="/" class="activity-panel--cross">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L22 21.9997"
          stroke="#000648"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 22L22 2.00027"
          stroke="#000648"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </nuxt-link>
    <!-- Page -->
    <div class="rgpd-card">
      <h1 class="main-font">
        Mentions légales
        <img
          src="~/assets/img/gribouillis_coeur_blanc.png"
          class="doodle coeur-doodle"
          alt=""
        />
        <img
          src="~/assets/img/gribouillis_croix_blanc.png"
          class="doodle croix-doodle"
          alt=""
        />
      </h1>
      <p>
        Votre adresse mail est en sécurité ! Nous prenons soin de vos données.
        Elles sont stockées chez <strong>Amazon AWS</strong>. Vous pouvez, à
        tout moment, demander à supprimer votre compte en nous contactant :
        <strong>contact@keskidi.fr</strong>
      </p>
      <p>
        <strong>"Pourquoi on me demande mon adresse mail ?"</strong> <br />
        Eh bien cela permet de récupérer un identifiant unique pour que vous
        puissiez retrouver votre progression également sur notre application
        Keskidico.
      </p>
      <p>
        <strong>"Est-ce qu'on m'enregistre ?"</strong> <br />
        L'expérience nécessite d'utiliser le micro de votre appareil. On
        n'enregistre pas votre voix, on ne saurait même pas quoi en faire.
      </p>
    </div>
    <!-- Footer -->
    <img src="~/assets/img/logo-gobelins.png" class="logo" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Rgpd extends Vue {
  // Default
  public onProgress: boolean = false;

  mounted() {}
}
</script>

<style scoped lang="scss">
.page-container {
  z-index: 39;
  height: 100vh;
  width: 100vw;
  background-color: $dark-orange;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 24px;
  }

  .activity-panel {
    &--about {
      position: absolute;
      top: 30px;
      left: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
      transition: 0.3s ease all;
      text-align: center;

      &:hover {
        color: $dark-blue;
        text-decoration: none;
      }
    }
    &--cross {
      position: absolute;
      top: 30px;
      right: 30px;
      background: linear-gradient(
        146.31deg,
        rgba(255, 255, 255, 0.4) 7.41%,
        rgba(255, 255, 255, 0.1) 94.07%
      );
      box-shadow: 0px 4px 25px -1px rgba(190, 190, 190, 0.15);
      backdrop-filter: blur(20px);
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      cursor: pointer;
    }
  }

  .rgpd-card {
    height: 650px;
    width: 600px;
    transform: rotate(5deg);
    padding: 80px;
    background-color: white;

    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    .doodle {
      position: absolute;
      z-index: -1;
    }

    h1 {
      font-style: normal;
      font-weight: bold;
      font-size: 90px;
      line-height: 108px;
      color: $dark-blue;
      width: max-content;
      position: absolute;

      top: 0;
      left: 50%;
      transform: translateX(-50%) rotate(-5deg);

      .coeur-doodle {
        right: -50px;
        top: 0;
      }

      .croix-doodle {
        left: -50px;
        bottom: 0;
      }
    }

    p {
      padding: 0;
      margin-top: 10px;
      color: $dark-blue;
    }
  }
}
</style>
