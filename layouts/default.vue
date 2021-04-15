<template>
  <div>
    <Nuxt/>
    <canvas ref="canvasGlobalScene"></canvas>
    <button style="z-index: 2; position: absolute; top: 0;" @click="initApp">Init app</button>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import ApiManager from "~/core/managers/ApiManager";
import GlobalModule from "~/store/global";
import {AssetsManager, SceneManager} from "~/core/managers";
import {
  AnimationMixer,
  HemisphereLight,
  HemisphereLightHelper,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import Helpers from "~/core/utils/helpers";
import {GLTF_ASSET} from "~/core/enums";

@Component({})
export default class DefaultLayout extends Vue {
  public globalModule = getModule(GlobalModule, this.$store)
  public mixer!:AnimationMixer

  mounted() {
    //this.initApp()
  }

  /**
   * Init app for the first connection
   */
   public async initApp() {
    if (!this.globalModule.isAppInit) {
      console.log('initApp from default')
      // Init ApiManager
      ApiManager.setAxios(this.$axios)

      // Load assets
      await AssetsManager
        .registerGltf(GLTF_ASSET.GLOBAL_SCENE, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/scene_globale.gltf')
        .registerImage('image-1', 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/group37.png')
        .registerImage('image-2', 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/group38.png')
        .onProgress((done, total) => {
          console.log(done / total * 100, '%')
        }).load()

      // Init global SceneManager
      SceneManager.GLOBAL_SCENE = this._createGlobalSceneManager()
      SceneManager.GLOBAL_SCENE
        ?.enableStats()
        .registerPresetCameraPositions({name: 'home', coord: new Vector3(2, 3, 6)})

      const globalScene = AssetsManager.getGltf(GLTF_ASSET.GLOBAL_SCENE).data

      globalScene.scene.scale.set(0.5, 0.5, 0.5)
      this.mixer = new AnimationMixer(globalScene.scene)

      globalScene.scene.animations.forEach((clip) => {

        this.mixer.clipAction(clip).play();
        // this.mixer.clipAction( clip ).stop()

      });

      SceneManager.GLOBAL_SCENE?.scene.add(globalScene.scene)
      SceneManager.GLOBAL_SCENE?.start()

      let roomObj = SceneManager.GLOBAL_SCENE?.scene.getObjectByName(GLTF_ASSET.GLOBAL_SCENE)

      SceneManager?.GLOBAL_SCENE?.camera.position.set(0, 70, 300)

      this._initLights()
      this._createFloor()


      this.globalModule.setIsAppInit(true)

    }
  }

  private _initLights(){
    const hemiLight = new HemisphereLight( 0xdff9fb, 0x080820, 1 );
    hemiLight.position.set(100,500,700)
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

    const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 1, 5000)
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
