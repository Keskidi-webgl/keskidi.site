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
export default class ActivitySceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, sceneModule: SceneModule }, void> {

  init() {
    SceneManager.ACTIVITY_SCENE = this._createInstance()
    this._addGltfGlobalScene()
    this._registerPresetPositions()
    this._addLights(true)
    this._configGUI()

    console.log('okokokokokokokokokokokokokokokokokokko')
    SceneManager.ACTIVITY_SCENE.start()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createInstance() {
    // Set canvas dimensions
    this._data.canvas.width = Helpers.getWindowSizes().width
    this._data.canvas.height = Helpers.getWindowSizes().height

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
      onRender: (ctx) => {
        // Add interactions points tracking
        // if (ctx.camera instanceof PerspectiveCamera) {
        //   ctx.camera.updateProjectionMatrix()
        // }
        // for (const point of this._data.sceneModule.activeInteractionPoints) {
        //   const screenPosition = point.canvasCoords().clone()
        //   screenPosition.project(SceneManager.ACTIVITY_SCENE.camera)
        //   const updateData = {
        //     name: point.name,
        //     transformX: screenPosition.x * this._data.canvas.clientWidth * 0.5,
        //     transformY: - screenPosition.y * this._data.canvas.clientHeight * 0.5
        //   }
        //
        //   this._data.sceneModule.updatePositionsInteractivePoint(updateData)
        // }
      },
      onWindowResize: (ctx) => {
        ctx.canvas.height = window.innerHeight
        ctx.canvas.width = window.innerWidth

        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.aspect = ctx.canvas.width / ctx.canvas.height
          camera.updateProjectionMatrix()
        }

        ctx.renderer.setSize(ctx.canvas.width, ctx.canvas.height)
        ctx.renderer.setPixelRatio(Math.min(Helpers.getWindowRatio(), ctx.defaultRatio))
      }
    })//.enableStats().enableAxesHelpers(1000)

  }

  /**
   * Create gui
   */
  private _configGUI() {
    let sceneFolder = SceneManager.ACTIVITY_SCENE.gui.addFolder("Scene")
    sceneFolder.add(SceneManager.ACTIVITY_SCENE.scene.position,'x',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.ACTIVITY_SCENE.scene.position,'y',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.ACTIVITY_SCENE.scene.position,'z',-500,500,0.01).listen()
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
    const globalSceneGltf = AssetsManager.getGltf(GLTF_ASSET.ACTIVITY_OBJECT_MOULA).data
    const crushGltf = AssetsManager.getGltf(GLTF_ASSET.ACTIVITY_OBJECT_CRUSH).data
    const noobGltf = AssetsManager.getGltf(GLTF_ASSET.ACTIVITY_OBJECT_NOOB).data

    console.log(globalSceneGltf,crushGltf,noobGltf)

    noobGltf.scene.position.set(10, 0, -20)
    noobGltf.scene.scale.set(0.2,0.2,0.2)
    noobGltf.scene.rotation.x = Math.PI / 2;

    globalSceneGltf.scene.position.set(-30, 0, 0)
    globalSceneGltf.scene.rotation.x = Math.PI / 2;

    crushGltf.scene.position.set(-10, 0, 0)
    crushGltf.scene.scale.set(0.5,0.5,0.5)
    crushGltf.scene.rotation.x = Math.PI / 2;


    SceneManager.ACTIVITY_SCENE.scene.add(globalSceneGltf.scene)
    SceneManager.ACTIVITY_SCENE.scene.add(crushGltf.scene)
    SceneManager.ACTIVITY_SCENE.scene.add(noobGltf.scene)

    SceneManager.ACTIVITY_SCENE.scene.traverse( child => {

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
      SceneManager.ACTIVITY_SCENE.scene.add(helper);
    }

    SceneManager.ACTIVITY_SCENE.scene.add(hemisphereLights);
  }

  /**
   * Register preset camera positions
   */
  private _registerPresetPositions() {
    CameraConfig.presetPositions.forEach(presetPosition => {
      SceneManager.ACTIVITY_SCENE.registerPresetCameraPositions(presetPosition)
    })
  }
}