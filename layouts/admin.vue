<template>
  <div class=" page-container admin-container">
    <header>
      <h1>
        <font-awesome-icon class="header-title" :icon="['fas', 'toolbox']" :style="{ color: '#2a2d3e' }"/>
        Dashboard admin Keskidi
      </h1>
    </header>

    <section>
      <aside class="admin-left-menu">
        <div class="menu-link-container">
          <nuxt-link exact v-for="link in adminModule.adminMenu.links" class="menu-link" :to="link.to">
            <font-awesome-icon :icon="['fas', link.icon]" :style="{ color: 'white' , fontSize: '20px'}"/>
            <span class="menu-link-text">{{ link.name }}</span>
          </nuxt-link>
        </div>
      </aside>
      <div class="admin-page-container">
        <Nuxt/>
      </div>
    </section>
  </div>
</template>

<script lang="ts">

import {Component, getModule, Vue} from "nuxt-property-decorator";
import AdminModule from "~/store/admin";
import {ApiManager} from "~/core/managers";
import {BvToast} from "bootstrap-vue";

@Component({})
export default class AdminLayout extends Vue {
  public adminModule: AdminModule = getModule(AdminModule, this.$store)

  head() {
    return {
      title: 'Dashboard - Home',
    }
  }

  mounted() {
    ApiManager.setAxios(this.$axios)
  }

  public static successToast(toastInstance: BvToast, message: string = 'Action effectuée avec succès !') {
    this._displayToast('Succès', message, 'success', toastInstance)
  }

  public static errorToast(toastInstance: BvToast, message: string = 'Une erreur s\'est produite') {
    this._displayToast('Erreur', message, 'error', toastInstance)
  }

  private static _displayToast(header: string, message: string, variant: string, toastInstance: BvToast) {
    toastInstance.toast(message, {
      title: header,
      variant,
      solid: true
    })
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "~bootstrap-vue/src/index.scss";

.admin-container {
  background-color: #edecec;
  display: flex;
  flex-direction: column;

  header {
    height: 70px;
    background-color: white;
    display: flex;
    align-items: center;
    padding: 0 30px;
    position: fixed;
    width: 100%;
    z-index: 20;
    box-sizing: 0 1px 4px 0 rgb(0, 0, 0 / 14%);

    h1 {
      font-size: 25px;

      .header-title {
        margin-right: 20px;
      }
    }
  }

  section {
    flex: 1;
    display: flex;

    aside {
      width: 320px;
      background-color: #2a2d3e;
      color: white;
      position: fixed;
      bottom: 0;
      top: 70px;

      .menu-link-container {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        box-sizing: border-box;

        .menu-link {
          height: 50px;
          display: flex;
          align-items: center;
          padding: 5px 30px;
          width: 100%;
          color: white;
          text-decoration: none;

          span {
            padding-left: 30px;
          }

          &:hover {
            background-color: #3E435B;
          }

          &.isActive {
            background-color: #3E435B;
          }
        }
      }
    }

    .admin-page-container {
      box-shadow: 0 1px 4px 0 rgb(0, 0, 0 / 14%);
      width: 100%;
      box-sizing: border-box;
      padding-left: 320px;
      padding-top: 70px;

      .admin-page {
        position: relative;
        margin: 30px;
        box-sizing: border-box;
        padding: 10px;
        background-color: white;
        min-height: calc(100% - 60px);

        .header-panel {
          padding-bottom: 20px;
        }
      }
    }
  }
}

.absolute-overlay {
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
