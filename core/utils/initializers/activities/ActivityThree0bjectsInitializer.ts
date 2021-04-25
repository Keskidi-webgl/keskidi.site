import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {
  Box3,
  HemisphereLight,
  HemisphereLightHelper,
  PerspectiveCamera,
  Scene, Vector3,
  WebGLRenderer
} from "three";
import {Initializers} from "~/core/defs";
import {GLTF_ASSET} from "~/core/enums";
import CameraConfig from "~/core/config/camera.config";
import SceneModule from "~/store/scene";

/**
 * @description
 * This initializer is responsible for creating the global scene of the application
 */
export default class ActivityThree0bjectsInitializer extends Initializers<{ canvas: HTMLCanvasElement, sceneModule: SceneModule }, void> {

  init() {
    SceneManager.ACTIVITY_3_OBJECTS = this._createInstance()
    this._addGltfGlobalScene()
    this._addLights(true)
    // this._configGUI()

    console.log('ACTIVITY_3_OBJECTSInitializer')
    SceneManager.ACTIVITY_3_OBJECTS.start()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createInstance() {
    // Set canvas dimensions

    let container = document.querySelector('.activity-itemPractice')

    this._data.canvas.width = 100
    this._data.canvas.height = 100

    // Create camera
    const camera = this._createCamera()

    // Create scene
    const scene = this._createScene()

    // Create renderer
    const renderer = this._createRender()

    return new SceneManager({
      canvas: this._data.canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      defaultRation: 2,
      activateOrbitControl: false,
      onRayCasterIntersect: (ctx,intersect)=>{
        if (intersect.length){
          // need to get objects name
          if(intersect[0].object.parent?.name === 'crushObject'){
            // console.log(intersect)
            ctx.currentIntersect = intersect[0]
            // console.log(ctx.currentIntersect,'<--- intersect')
          }
        }

      },
      onRender: (ctx) => {
        // Add interactions points tracking
        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.updateProjectionMatrix()
        }
      },
      onWindowResize: (ctx) => {
        ctx.canvas.height = window.innerHeight
        ctx.canvas.width = window.innerWidth

        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.aspect = ctx.canvas.width / ctx.canvas.height
          ctx.camera.updateProjectionMatrix()
        }

        ctx.renderer.setSize(ctx.canvas.width, ctx.canvas.height)
        ctx.renderer.setPixelRatio(Math.min(Helpers.getWindowRatio(), ctx.defaultRatio))
      }
    }).enableRayCasting()
      .enableStats()

  }

  /**
   * Create gui
   */
  private _configGUI() {
    let sceneFolder = SceneManager.ACTIVITY_3_OBJECTS.gui.addFolder("Scene")
    sceneFolder.add(SceneManager.ACTIVITY_3_OBJECTS.scene.position,'x',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.ACTIVITY_3_OBJECTS.scene.position,'y',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.ACTIVITY_3_OBJECTS.scene.position,'z',-500,500,0.01).listen()
  }

  /**
   * Create perspective camera
   */
  private _createCamera() {
    return new PerspectiveCamera(
      50,
      this._data.canvas.width / this._data.canvas.height,
      1,
      10000
    )
  }

  /**
   * Create scene
   */
  private _createScene() {
    return new Scene()
  }

  /**
   * Create renderer
   * @private
   */
  private _createRender() {
    return new WebGLRenderer({
      canvas: this._data.canvas,
      antialias: true,
      alpha: true,
    })
  }

  /**
   * Retrieve gltf global scene and inject it into Global scene instance
   */
  private _addGltfGlobalScene() {
    const moulaGltf = AssetsManager.getGltf(GLTF_ASSET.ACTIVITY_OBJECT_MOULA).data
    const crushGltf = AssetsManager.getGltf(GLTF_ASSET.ACTIVITY_OBJECT_CRUSH).data
    const noobGltf = AssetsManager.getGltf(GLTF_ASSET.ACTIVITY_OBJECT_NOOB).data

    console.log(moulaGltf,crushGltf,noobGltf)

    noobGltf.scene.position.set(10, 0, -20)
    noobGltf.scene.scale.set(0.2,0.2,0.2)
    noobGltf.scene.rotation.x = Math.PI / 2;

    SceneManager.ACTIVITY_3_OBJECTS.scene.add(noobGltf.scene)

    SceneManager.ACTIVITY_3_OBJECTS.scene.traverse( child => {

      // @ts-ignore
      if ( child.material ) child.material.metalness = 0;

    } );
  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    const hemisphereLights = new HemisphereLight(0xdff9fb, 0x080820, 1);
    //hemisphereLights.position.set(100, 500, 700)
    if (withHelper) {
      const helper = new HemisphereLightHelper(hemisphereLights, 5);
      SceneManager.ACTIVITY_3_OBJECTS.scene.add(helper);
    }

    SceneManager.ACTIVITY_3_OBJECTS.scene.add(hemisphereLights);
  }

}
