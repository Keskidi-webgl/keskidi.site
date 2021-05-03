import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  Mesh,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Vector3,
  WebGLRenderer
} from "three";
import {Initializers} from "~/core/defs";
import {GLTF_ASSET} from "~/core/enums";
import GlobalSceneStore from "~/store/globalScene";
import GlobalSceneConfig from "~/core/config/global-scene/global-scene.config";
import {Object3D} from "three/src/core/Object3D";
import GlobalScene from "~/core/scene/GlobalScene";
import TomSceneElement from "~/core/scene/TomSceneElement";
import SceneHelper from "~/core/utils/sceneHelper";

/**
 * @description
 * This initializer is responsible for creating the global scene of the application
 */
export default class GlobalSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, globalSceneStore: GlobalSceneStore }, void> {

  init() {
    GlobalScene.setSceneContext(this._createSceneContext())
    this._addSceneElements()
    this._addLights(true)
    this._registerPresetPositions()
    this._optimizeScene()
    //this._prepareFloor()
    this._configGUI()
    console.log(GlobalScene.context)

    GlobalScene.context.start()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createSceneContext() {
    // Set canvas dimensions
    this._data.canvas.width = Helpers.getWindowSizes().width
    this._data.canvas.height = Helpers.getWindowSizes().height

    // Create camera
    const camera = this._createCamera()

    // Create scene
    const scene = this._createScene()

    // Create renderer
    const renderer = this._createRender()
    renderer.outputEncoding = sRGBEncoding
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

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
        for (const point of this._data.globalSceneStore.activeInteractionPoints) {
          const screenPosition = point.canvasCoords().clone()
          screenPosition.project(GlobalScene.context.camera)
          const updateData = {
            name: point.name,
            transformX: screenPosition.x * this._data.canvas.clientWidth * 0.5,
            transformY: - screenPosition.y * this._data.canvas.clientHeight * 0.5
          }

          this._data.globalSceneStore.updatePositionsInteractivePoint(updateData)
        }

      },
      onResume: (ctx) => {
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
    })//.hideGui()
      //.enableStats()
      .enableParallax()
      //.enableAxesHelpers(1000)

  }

  /**
   * Create gui
   */
  private _configGUI() {
    let sceneFolder = GlobalScene.context.gui.addFolder("Scene")
    sceneFolder.add(GlobalScene.context.scene.position, 'x', -500, 500, 0.01).listen()
    sceneFolder.add(GlobalScene.context.scene.position, 'y', -500, 500, 0.01).listen()
    sceneFolder.add(GlobalScene.context.scene.position, 'z', -500, 500, 0.01).listen()
  }

  /**
   * Create perspective camera
   */
  private _createCamera() {
    const camera = new PerspectiveCamera(
      50,
      this._data.canvas.width / this._data.canvas.height,
      1,
      10000
    )
    camera.position.set(0, 1000, 1000)
    camera.lookAt(new Vector3())

    return camera
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

  private _addSceneElements() {
    this._addGltfGlobalScene()
    this._addGltfTom()
    this._addGltfOutside()
  }

  /**
   * Retrieve gltf global scene and inject it into Global scene instance
   */
  private _addGltfGlobalScene() {
    const globalSceneGltf = AssetsManager.getGltf(GLTF_ASSET.GLOBAL_SCENE).data
    globalSceneGltf.scene.position.set(0, 0, 0)

    GlobalScene.context.scene.add(globalSceneGltf.scene)
  }

  private _addGltfTom() {
    GlobalScene.context.scene.add(TomSceneElement.sceneElement)
    TomSceneElement.setupForGlobalScene()
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.TOM, TomSceneElement.sceneElement)
    TomSceneElement.playHelloAnimation(GlobalScene.context)
  }

  private _addGltfOutside() {
    const outside = AssetsManager.getGltf(GLTF_ASSET.OUTSIDE).data
    GlobalScene.context.scene.add(outside.scene)
  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    /*
    const hemisphereLights = new HemisphereLight( 0xffffff, 0xffffff, 0.6);
    hemisphereLights.color.setHSL( 0.6, 0.75, 0.5 );
    hemisphereLights.groundColor.setHSL( 0.095, 0.5, 0.5 );
    if (withHelper) {
      const helper = new HemisphereLightHelper(hemisphereLights, 5);
      GlobalScene.context.scene.add(helper);
    }

    const spotLight = new SpotLight(0xffffff, 0.3);
    spotLight.position.set(200,1000,200);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    spotLight.castShadow = true

    if (withHelper) {
      const helper = new SpotLightHelper(spotLight, 5);
      //GlobalScene.context.scene.add(helper);
    }
    //GlobalScene.context.scene.add(spotLight)
    GlobalScene.context.scene.add(hemisphereLights);

     */
    const dirLight = new DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(200, 1000, 200);
    dirLight.position.multiplyScalar(50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 500;
    dirLight.shadow.camera.far = 4000;

    GlobalScene.context.scene.add(dirLight);

    dirLight.castShadow = true;
    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    GlobalScene.context.scene.add(hemiLight);
  }

  /**
   * Register preset camera positions
   */
  private _registerPresetPositions() {
    GlobalSceneConfig.cameraPositions.forEach(presetPosition => {
      GlobalScene.context.registerPresetCameraPositions(presetPosition)
    })
  }

  private _optimizeScene() {
    const objects: Array<Object3D> = [
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.OUTSIDE)!,
      GlobalScene.context.scene.getObjectByName('socle')!,
    ]
    SceneHelper.replaceByBasicMaterial(objects, GlobalScene.context)
  }

  private _prepareFloor() {

  }
}
