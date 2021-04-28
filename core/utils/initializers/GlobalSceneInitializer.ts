import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {AnimationClip, HemisphereLight, HemisphereLightHelper, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {Initializers} from "~/core/defs";
import {GLTF_ASSET} from "~/core/enums";
import CameraConfig from "~/core/config/camera.config";
import SceneModule from "~/store/scene";

/**
 * @description
 * This initializer is responsible for creating the global scene of the application
 */
export default class GlobalSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, sceneModule: SceneModule }, void> {

  init() {
    SceneManager.GLOBAL_SCENE = this._createInstance()
    this._addGltfGlobalScene()
    this._addGltfTom()
    this._registerPresetPositions()
    this._addLights(true)
    //this._configGUI()

    SceneManager.GLOBAL_SCENE.start()
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
        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.updateProjectionMatrix()
        }
        for (const point of this._data.sceneModule.activeInteractionPoints) {
          const screenPosition = point.canvasCoords().clone()
          screenPosition.project(SceneManager.GLOBAL_SCENE.camera)
          const updateData = {
            name: point.name,
            transformX: screenPosition.x * this._data.canvas.clientWidth * 0.5,
            transformY: - screenPosition.y * this._data.canvas.clientHeight * 0.5
          }

          this._data.sceneModule.updatePositionsInteractivePoint(updateData)
        }
      },
      onResume:(ctx)=> {
        this._addGltfTom()
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
    }).hideGui()//.enableStats().enableAxesHelpers(1000)

  }

  /**
   * Create gui
   */
  private _configGUI() {
    let sceneFolder = SceneManager.GLOBAL_SCENE.gui.addFolder("Scene")
    sceneFolder.add(SceneManager.GLOBAL_SCENE.scene.position,'x',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.GLOBAL_SCENE.scene.position,'y',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.GLOBAL_SCENE.scene.position,'z',-500,500,0.01).listen()
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
    const globalSceneGltf = AssetsManager.getGltf(GLTF_ASSET.GLOBAL_SCENE).data
    globalSceneGltf.scene.position.set(0, 0, 0)


    SceneManager.GLOBAL_SCENE.scene.add(globalSceneGltf.scene)
    SceneManager.GLOBAL_SCENE.scene.traverse( child => {
      // @ts-ignore
      if ( child.material ) child.material.metalness = 0;
    } );

  }

  private _addGltfTom() {
    const tomGltf = AssetsManager.getFbx(GLTF_ASSET.TOM).data
    console.log(tomGltf)
    tomGltf.scale.set(0.8, 0.8, 0.8)
    tomGltf.position.set(50, 40, 500)
    tomGltf.rotation.y = -45
    SceneManager.GLOBAL_SCENE.scene.add(tomGltf)

    SceneManager.GLOBAL_SCENE.createAnimationMixer(GLTF_ASSET.TOM, tomGltf)
    SceneManager.GLOBAL_SCENE.playAnimation(tomGltf.animations[0], GLTF_ASSET.TOM)
  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    const hemisphereLights = new HemisphereLight(0xdff9fb, 0x080820, 1);
    //hemisphereLights.position.set(100, 500, 700)
    if (withHelper) {
      const helper = new HemisphereLightHelper(hemisphereLights, 5);
      SceneManager.GLOBAL_SCENE.scene.add(helper);
    }

    SceneManager.GLOBAL_SCENE.scene.add(hemisphereLights);
  }

  /**
   * Register preset camera positions
   */
  private _registerPresetPositions() {
    CameraConfig.presetPositions.forEach(presetPosition => {
      SceneManager.GLOBAL_SCENE.registerPresetCameraPositions(presetPosition)
    })
  }
}
