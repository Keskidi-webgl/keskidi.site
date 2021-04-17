import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {Box3, HemisphereLight, HemisphereLightHelper, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from "three";
import {Initializers} from "~/core/defs";
import {GLTF_ASSET} from "~/core/enums";
import CameraConfig from "~/core/config/camera.config";
import {GUI} from "dat.gui";

/**
 * @description
 * This initializer is responsible for creating the global scene of the application
 */
export default class GlobalSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement }, void> {

  public points!:{position:Vector3,element:HTMLElement}[]

  init() {
    SceneManager.GLOBAL_SCENE = this._createInstance()
    this._addGltfGlobalScene()
    this._registerPresetPositions()
    this._addLights(true)

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


    const gui = this._createGui()

    return new SceneManager({
      canvas: this._data.canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      activateOrbitControl: true,
      gui: gui,
      onRender: (ctx)=>{

        for(const point of this.points) {
          const screenPosition = point.position.clone()
          screenPosition.project(SceneManager.GLOBAL_SCENE.camera)

          const translateX = screenPosition.x * this._data.canvas.width * 0.5
          const translateY = - screenPosition.y * this._data.canvas.height * 0.5

          point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`

        }
        // let screenPos = this.chambrePos?.clone()
        // screenPos!.x = Math.round((0.5 + screenPos!.x / 2) * (this._data.canvas.width / window.devicePixelRatio));
        // points.style.left = `${screenPos!.x}px`
      }
    }).enableStats()

  }

  /**
   * Create gui
   */
  private _createGui(){
    return new GUI()
  }

  /**
   * Create perspective camera
   */
  private _createCamera() {
    return new PerspectiveCamera(50, this._data.canvas.width / this._data.canvas.height, 1, 5000)
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
    const box3 = new Box3().setFromObject(globalSceneGltf.scene);
    const vector = new Vector3();
    box3.getCenter(vector);
    globalSceneGltf.scene.position.set(-vector.x, -vector.y, -vector.z);
    let chambrePos = globalSceneGltf.scene.getObjectByName('chambre')?.position
    console.log(chambrePos)
    this.points = [{
      position: new Vector3(chambrePos?.x,chambrePos?.y,chambrePos?.z),
      element: document.querySelector('.point-0') as HTMLElement
    }]
    console.log(this.points)
    // console.log(globalSceneGltf.scene)
    // this.chambrePos = globalSceneGltf.scene.getObjectByName('chambre')?.position
    // console.log(this.chambrePos)
    // this.chambrePos?.project(SceneManager.GLOBAL_SCENE.camera)


    SceneManager.GLOBAL_SCENE.scene.add(globalSceneGltf.scene)

    let sceneFolder = SceneManager.GLOBAL_SCENE.gui.addFolder("Scene")

    sceneFolder.add(SceneManager.GLOBAL_SCENE.guiOptions,'posX',-500,500,0.01).onChange((val)=>{
      SceneManager.GLOBAL_SCENE.scene.position.x = val
    })

  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    const hemisphereLights = new HemisphereLight(0xdff9fb, 0x080820, 1);
    hemisphereLights.position.set(100, 500, 700)
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
      SceneManager.GLOBAL_SCENE.registerPresetCameraPositions({
        name: presetPosition.name,
        coords: presetPosition.coords()
      })
    })
  }
}
