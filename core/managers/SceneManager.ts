import {
  AxesHelper,
  Camera,
  Clock,
  Euler, Intersection, Object3D,
  PerspectiveCamera,
  Quaternion,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three";
import {
  DefaultSceneManagerCallback,
  MouseMoveCanvasCallback, PresetCameraPosition,
  RayCasterIntersectCallBack,
  SceneManagerOptions,
  WindowResizeCallback
} from "~/core/types";
import gsap from 'gsap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {GUI} from "dat.gui";

/**
 * @description
 * This manager is responsible for creating a scene 3D and a context to interact with it
 */
export default class SceneManager {

  /**
   * Static accessors for scenes instances
   */
  public static GLOBAL_SCENE: SceneManager
  public static ACTIVITY_SCENE: SceneManager

  // Activity 1 Accessors
  public static ACTIVITY_1_OBJECTS: SceneManager
  public static ACTIVITY_1_TOM: SceneManager
  public static ACTIVITY_1_RESULTS: SceneManager

  // Activity 2 Accessors
  public static ACTIVITY_2_OBJECTS: SceneManager

  // Activity 3 Accessors
  public static ACTIVITY_3_OBJECTS: SceneManager
  public static ACTIVITY_3_TOM: SceneManager
  public static ACTIVITY_3_RESULTS: SceneManager



  // - PROPERTIES
  private _canvas: HTMLCanvasElement
  private _camera: Camera
  private _controls: OrbitControls | null
  private _presetCameraPositions: Array<PresetCameraPosition>
  private _renderer: WebGLRenderer
  private _clock: Clock
  private _mousePositions: Vector2
  private _scene: Scene
  private _gui: GUI
  private _rayCaster: Raycaster
  private _stats: Stats | null
  private _defaultRatio: number
  private _currentIntersect: null

  // -- Clock infos
  private _requestId: undefined | number
  private _deltaTime: number
  private _previousTime: number

  // -- Events
  private _onStartCallback: DefaultSceneManagerCallback
  private _onResumeCallback: DefaultSceneManagerCallback
  private _onPauseCallback: DefaultSceneManagerCallback
  private _onDestroyCallback: DefaultSceneManagerCallback
  private _onRenderCallback: DefaultSceneManagerCallback
  private _onRayCasterIntersectCallback: RayCasterIntersectCallBack
  private _onMouseMoveCanvasCallback: MouseMoveCanvasCallback
  private _onWindowResizeCallback: WindowResizeCallback
  private _bindExternEvents: DefaultSceneManagerCallback

  // -- Configuration
  private _isOrbitControlActivated: boolean
  private _isPlaying: boolean
  private _isRayCasting: boolean
  private _isStatsActive: boolean

  // - CONSTRUCTOR
  constructor(options: SceneManagerOptions) {
    this._camera = options.camera
    this._presetCameraPositions = []
    this._canvas = options.canvas
    this._clock = options.clock || new Clock()
    this._mousePositions = new Vector2()
    this._renderer = options.renderer
    this._scene = options.scene
    this._rayCaster = new Raycaster()
    this._isPlaying = false
    this._isRayCasting = false
    this._isStatsActive = false
    this._controls = null
    this._deltaTime = 0
    this._previousTime = 0
    this._gui = new GUI()
    this._stats = null
    this._defaultRatio = options.defaultRation || 1
    this._currentIntersect = null

    this._onStartCallback = options.onStart || function () {
    }
    this._onResumeCallback = options.onResume || function () {
    }
    this._onPauseCallback = options.onPause || function () {
    }

    this._onDestroyCallback = options.onDestroy || function () {
    }
    this._onRenderCallback = options.onRender || function () {
    }
    this._onRayCasterIntersectCallback = options.onRayCasterIntersect || function () {
    }
    this._bindExternEvents = options.bindEvents || function () {
    }
    this._onMouseMoveCanvasCallback = options.onMouseMoveCanvas || function () {
    }
    this._onWindowResizeCallback = options.onWindowResize || function () {
    }

    this._isOrbitControlActivated = options.activateOrbitControl

    this._init()
  }

  // - PUBLIC METHODS
  /**
   * Destroy the scene
   */
  public destroy() {
    // TODO --> destroy all elements

    this._onDestroyCallback(this)
    if (this._requestId) {
      cancelAnimationFrame(this._requestId)
    }
    this._renderer.dispose()
    // @ts-ignore
    this._scene = null
    // this.scene.traverse(child=>{
    //   if(child instanceof Object3D){
    //     child.dispose()
    //   }
    // })
    // this._gui.destroy()
  }

  /**
   * Pause animations of the scene
   */
  public pause() {
    this._onPauseCallback(this)
    this._isPlaying = false
  }

  /**
   * Start animations of the scene
   */
  public start() {
    this._isPlaying = true
    this._onStartCallback(this)
    this._tick()
  }

  /**
   * Start animations of the scene
   */
  public resume() {
    this._isPlaying = true
    this._onResumeCallback(this)
    this._tick()
  }

  /**
   * Register preset camera positions
   */
  public registerPresetCameraPositions(position: PresetCameraPosition): SceneManager {
    this._presetCameraPositions.push(position)

    return this
  }

  /**
   * Move the camera to the preset position
   */
  public goToPresetPosition(
    name: string,
    duration: number,
    successCallBack: DefaultSceneManagerCallback = function () {
    },
    errorCallBack: DefaultSceneManagerCallback = function () {
    }
  ) {
    const presetCameraPosition = this._presetCameraPositions.find(camPos => camPos.name === name)

    if (!presetCameraPosition) {
      errorCallBack(this)
      return
    }

    const {cameraPos: newCameraPosition, lookAtPosition} = presetCameraPosition.coords()

    const originPosition = new Vector3().copy(this._camera.position);
    const originRotation = new Euler().copy(this._camera.rotation);

    this._camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
    this._camera.lookAt(lookAtPosition);
    const destinationRotation = new Euler().copy(this._camera.rotation)

    this._camera.position.set(originPosition.x, originPosition.y, originPosition.z);
    this._camera.rotation.set(originRotation.x, originRotation.y, originRotation.z);

    const originQuaternion = new Quaternion().copy(this._camera.quaternion);
    const destinationQuaternion = new Quaternion().setFromEuler(destinationRotation);
    const updateQuaternion = new Quaternion();
    const o = {t: 0};


    gsap.to(this._camera.position, {
      duration,
      x: newCameraPosition.x,
      y: newCameraPosition.y,
      z: newCameraPosition.z,
      onUpdate: () => {
        if (this._camera instanceof PerspectiveCamera) {
          this._camera.updateProjectionMatrix()
          //this.camera.lookAt(lookAtPosition)
        }

      },
      onComplete: () => {
        successCallBack(this)
      }
    });
    gsap.to(o, {
      duration,
      t: 1,
      onUpdate: () => {
        updateQuaternion.slerpQuaternions(originQuaternion, destinationQuaternion, o.t)
        this._camera.quaternion.set(updateQuaternion.x, updateQuaternion.y, updateQuaternion.z, updateQuaternion.w)
      }
    })


  }

  /**
   * Enable orbit control
   */
  public enableOrbitControl() {
    if (this._controls) {
      this._controls.enabled = true
    }

    return this
  }

  /**
   * Disable orbit control
   */
  public disableOrbitControl() {
    if (this._controls) {
      this._controls.enabled = false
    }

    return this
  }

  /**
   * Enable rayCasting detection
   */
  public enableRayCasting() {
    this._isRayCasting = true

    return this
  }

  /**
   * Disable RayCasting detection
   */
  public disableRayCasting() {
    this._isRayCasting = false

    return this
  }

  /**
   * Enable Stats panel
   */
  public enableStats() {
    if (!this._stats) {
      this._stats = Stats()
      this._stats.showPanel(0)
      document.body.appendChild(this._stats.dom)
    }

    this._isStatsActive = true

    return this
  }

  /**
   * Enable axes helper
   */
  public enableAxesHelpers(size: number = 10) {
    const axesHelper = new AxesHelper(size)
    this._scene.add(axesHelper)

    return this
  }

  /**
   * Init intern mandatory events
   */
  public _bindEvents() {
    this._bindExternEvents(this)

    this._canvas.addEventListener('mousemove', event => {
      this._mousePositions.x = event.clientX / this._canvas.width * 2 - 1
      this._mousePositions.y = -(event.clientY / this._canvas.height) * 2 + 1
      this._onMouseMoveCanvasCallback(this, event)
    })

    window.addEventListener('resize', event => {
      this._onWindowResizeCallback(this, event)
    })
  }


  public setObjectVisibility(objectList: Array<string>, visibleObject: string | null = null) {
    objectList.forEach(objectName => {
      const visibleValue = (visibleObject) ? objectName === visibleObject : true
      console.log(visibleValue)
      this.scene.getObjectByName(objectName)!.visible = visibleValue
    })
  }
  // - PRIVATE
  /**
   * Init elements after property binding into constructor
   */
  private _init() {
    this._initRenderer()
    this._initControls()

    this._bindEvents()

    this._checkConfig()
  }


  /**
   * Init renderer
   */
  private _initRenderer() {
    this._renderer.setSize(this._canvas.width, this._canvas.height)
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, this._defaultRatio))
  }

  /**
   * Init controls for camera
   */
  private _initControls() {
    if (this._isOrbitControlActivated) {
      this._controls = new OrbitControls(this._camera, this._canvas)
      this._controls.enableDamping = true
    }
  }

  /**
   * Check configuration and warn weird things
   */
  private _checkConfig() {
    if (!(this._camera instanceof PerspectiveCamera)) {
      console.warn('Your camera is not Perspective Camera')
    }
  }

  /**
   * Update loop of the scene
   */
  private _tick() {
    if (!this._isPlaying) return

    if (this._isStatsActive && this._stats) this._stats.begin()
    this._render()
    if (this._isStatsActive && this._stats) this._stats.end()

    this._requestId = requestAnimationFrame(this._tick.bind(this))
  }

  /**
   * Logic to render the scene (for each frame)
   */
  private _render() {
    this._onRenderCallback(this)

    if (this._controls) {
      this._controls.update()
    }

    if (this._isRayCasting) {
      this._rayCaster.setFromCamera(this._mousePositions, this._camera)
      const intersects = this._rayCaster.intersectObjects(this._scene.children,true)
      this._onRayCasterIntersectCallback(this, intersects)
    }

    if (this._camera instanceof PerspectiveCamera) {
      this._camera.updateProjectionMatrix()
    }

    const elapsedTime = this._clock.getElapsedTime()
    this._deltaTime = elapsedTime - this._previousTime
    this._previousTime = elapsedTime
    this._renderer.render(this._scene, this._camera)
  }

  // - GETTERS
  get camera(): Camera {
    return this._camera
  }

  get clock(): Clock {
    return this._clock
  }

  get gui(): GUI {
    return this._gui
  }

  get renderer(): WebGLRenderer {
    return this._renderer
  }

  get scene(): Scene {
    return this._scene
  }

  get currentIntersect(): any {
    return this._currentIntersect
  }


  get mousePositions(): Vector2 {
    return this._mousePositions
  }

  get deltaTime(): number {
    return this._deltaTime
  }

  get width(): number {
    return this._canvas.width
  }

  get height(): number {
    return this._canvas.height
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  get defaultRatio() {
    return this._defaultRatio
  }

  // setters
  set currentIntersect(currentIntersect:any) {
    this._currentIntersect = currentIntersect
  }

}
