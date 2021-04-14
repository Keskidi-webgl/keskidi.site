<template>
  <div>
    <Nuxt/>
    <img src="~/static/img.png" alt="">
    <canvas ref="canvasGlobalScene"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import ApiManager from "~/core/managers/ApiManager";
import GlobalModule from "~/store/global";
import {SceneManager} from "~/core/managers";
import {Color, PerspectiveCamera, Scene, SpotLight, Vector3, WebGLRenderer} from "three";
import Helpers from "~/core/utils/helpers";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

@Component({})
export default class DefaultLayout extends Vue {
  public globalModule = getModule(GlobalModule, this.$store)

  mounted() {
    this.initApp()
  }

  /**
   * Init app for the first connection
   */
   public async initApp() {
    if (!this.globalModule.isAppInit) {
      console.log('initApp from default')
      // Init ApiManager
      ApiManager.setAxios(this.$axios)

      // Init global SceneManager
      SceneManager.GLOBAL_SCENE = this._createGlobalSceneManager()
      SceneManager.GLOBAL_SCENE
        ?.enableStats()
        .registerPresetCameraPositions({name: 'home', coord: new Vector3(2, 3, 6)})
        new GLTFLoader().load('/models/chambre.gltf',(gltf)=>{
          gltf.scene.name = "chambre"
          console.log(gltf)
          SceneManager.GLOBAL_SCENE?.scene.add(gltf.scene)
          SceneManager.GLOBAL_SCENE?.start()

          console.log(SceneManager.GLOBAL_SCENE?.scene.getObjectByName("chambre",true))
           SceneManager.GLOBAL_SCENE?.camera.lookAt(SceneManager.GLOBAL_SCENE?.scene.getObjectByName("chambre",true))



          const spotLight = new SpotLight( 0xffffff );
          spotLight.position.set( 300, 300, 270 );

          spotLight.castShadow = true;

          spotLight.shadow.mapSize.width = 1024;
          spotLight.shadow.mapSize.height = 1024;

          spotLight.shadow.camera.near = 500;
          spotLight.shadow.camera.far = 4000;
          spotLight.shadow.camera.fov = 30;

          SceneManager.GLOBAL_SCENE?.scene.add( spotLight );

          const spotLightHelper = new THREE.SpotLightHelper( spotLight );
          SceneManager.GLOBAL_SCENE?.scene.add( spotLightHelper );


          this.globalModule.setIsAppInit(true)
        }
      );

    }
  }

  /**
   * Create global scene
   */
  private _createGlobalSceneManager(): SceneManager {
    const canvas: HTMLCanvasElement = this.$refs.canvasGlobalScene as HTMLCanvasElement
    canvas.width = Helpers.getWindowSizes().width
    canvas.height = Helpers.getWindowSizes().height

    const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 1, 1000)
    camera.position.set(4, 4, 4)
    camera.updateMatrixWorld();

    const scene = new Scene()
    scene.background = new Color('green')

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
      },
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
