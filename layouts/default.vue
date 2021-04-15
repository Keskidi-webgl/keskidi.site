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
import {
  Color,
  PerspectiveCamera,
  Scene,
  HemisphereLight,
  HemisphereLightHelper,
  Vector3,
  WebGLRenderer,
  PlaneGeometry, MeshPhongMaterial, Mesh, AnimationMixer
} from "three";
import Helpers from "~/core/utils/helpers";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

@Component({})
export default class DefaultLayout extends Vue {
  public globalModule = getModule(GlobalModule, this.$store)
  public mixer!:AnimationMixer

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

          this.mixer = new AnimationMixer(gltf.scene)

          gltf.animations.forEach( ( clip ) => {

            this.mixer.clipAction( clip ).play();
            // this.mixer.clipAction( clip ).stop()

          } );

          console.log(gltf)
          SceneManager.GLOBAL_SCENE?.scene.add(gltf.scene)
          SceneManager.GLOBAL_SCENE?.start()

          let roomObj = SceneManager.GLOBAL_SCENE?.scene.getObjectByName("chambre")

          SceneManager?.GLOBAL_SCENE?.camera.position.set(0,70,300)

          this._initLights()
          this._createFloor()


          this.globalModule.setIsAppInit(true)
        }
      );

    }
  }

  private _initLights(){
    const hemiLight = new HemisphereLight( 0xdff9fb, 0x080820, 1 );
    hemiLight.position.set(0,200,-50)
    const helper = new HemisphereLightHelper( hemiLight, 5 );
    SceneManager.GLOBAL_SCENE?.scene.add( helper );
    SceneManager.GLOBAL_SCENE?.scene.add( hemiLight );
  }

  /**
   * Create floor scene
   */
  private _createFloor(){
    // Floor
    var floorGeometry = new PlaneGeometry(5000, 5000, 1, 1);
    var floorMaterial = new MeshPhongMaterial({
      color: 0xeeeeee, // This color is manually dialed in to match the background color
      shininess: 0
    });

    var floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    floor.position.y = -100;
    SceneManager.GLOBAL_SCENE?.scene.add(floor);
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
    // scene.background = new Color('green')

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
      onRender: (ctx) => {
        // console.log(ctx._deltaTime)
        this.mixer.update(ctx.deltaTime)

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
