import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {
  HemisphereLight,
  HemisphereLightHelper,
  Mesh,
  MeshBasicMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer
} from "three";
import {Initializers} from "~/core/defs";
import {GLTF_ASSET} from "~/core/enums";
import GlobalSceneStore from "~/store/globalScene";
import GlobalSceneConfig from "~/core/config/global-scene/global-scene.config";
import {Object3D} from "three/src/core/Object3D";
import GlobalScene from "~/core/scene/GlobalScene";
import TomSceneElement from "~/core/scene/TomSceneElement";

/**
 * @description
 * This initializer is responsible for creating the global scene of the application
 */
export default class GlobalSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, globalSceneStore: GlobalSceneStore }, void> {

  init() {
    GlobalScene.setSceneContext(this._createSceneContext())
    this._addGltfGlobalScene()
    this._addGltfTom()
    this._registerPresetPositions()
    //this._optimizeScene()
    this._addLights(true)
    this._configGUI()

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


    GlobalScene.context.scene.add(globalSceneGltf.scene)
    GlobalScene.context.scene.traverse(child => {
      // @ts-ignore
      if (child.material) child.material.metalness = 0;
    });

  }

  private _addGltfTom() {
    GlobalScene.context.scene.add(TomSceneElement.sceneElement)
    TomSceneElement.setupForGlobalScene()
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.TOM, TomSceneElement.sceneElement)
    TomSceneElement.playIdleAnimation(GlobalScene.context)
  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    const hemisphereLights = new HemisphereLight(0xdff9fb, 0x080820, 1);
    //hemisphereLights.position.set(100, 500, 700)
    if (withHelper) {
      const helper = new HemisphereLightHelper(hemisphereLights, 5);
      GlobalScene.context.scene.add(helper);
    }

    GlobalScene.context.scene.add(hemisphereLights);
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
    const objectToExclude: Array<Object3D> = [
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.TOM)!,
      GlobalScene.context.scene.getObjectByName('chat')!
    ]

    const namesToExclude: string[] = []

    objectToExclude.forEach(obj => {
      namesToExclude.push(obj.name)
      namesToExclude.push(...this._getChildrenNames(obj))
    })

    GlobalScene.context.scene.traverse(child => {

      if (child instanceof Mesh && !namesToExclude.includes(child.name)) {
        const prevMaterial = child.material
        const newMaterial = new MeshBasicMaterial()
        newMaterial.copy((prevMaterial as MeshBasicMaterial))
        if (prevMaterial.map === null && prevMaterial.emissiveMap) {
          newMaterial.map = prevMaterial.emissiveMap

        }
        child.material = newMaterial

      }
    })
  }

  private _getChildrenNames(object3D: Object3D): string[] {
    const children: string[] = []
    object3D.traverse((child) => {
      children.push(child.name)
    })
    return children
  }
}
