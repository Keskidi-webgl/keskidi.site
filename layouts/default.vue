<template>
  <div>
    <Nuxt/>
    <canvas ref="canvasGlobalScene"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import ApiManager from "~/core/managers/ApiManager";
import GlobalModule from "~/store/global";
import {SceneManager} from "~/core/managers";
import {Color, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import Helpers from "~/core/utils/helpers";

@Component({})
export default class DefaultLayout extends Vue {
  public globalModule = getModule(GlobalModule, this.$store)

  mounted() {
    this.initApp()
    SceneManager.GLOBAL_SCENE
      ?.enableStats()
      .start()
  }

  /**
   * Init app for the first connection
   */
  public initApp() {
    if (!this.globalModule.isAppInit) {
      console.log('initApp from default')
      // Init ApiManager
      ApiManager.setAxios(this.$axios)

      // Init global SceneManager
      SceneManager.GLOBAL_SCENE = this._createGlobalSceneManager()
      this.globalModule.setIsAppInit(true)
    }
  }

  private _createGlobalSceneManager(): SceneManager {
    const canvas: HTMLCanvasElement = this.$refs.canvasGlobalScene as HTMLCanvasElement
    canvas.width = Helpers.getWindowSizes().width
    canvas.height = Helpers.getWindowSizes().height

    const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 1, 1000)
    camera.position.set(70, 50, 10)
    camera.updateMatrixWorld();

    const scene = new Scene()
    scene.background = new Color('black')

    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    return new SceneManager({
      canvas: canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      activateOrbitControl: true,
      onRender: (context) => {
      }
    })
  }
}
</script>

<style>
canvas
{
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
