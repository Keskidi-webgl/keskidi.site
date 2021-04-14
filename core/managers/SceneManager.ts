import {Camera, Clock, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer} from "three";
import {
  CameraPosition,
  DefaultSceneManagerCallback,
  MouseMoveCanvasCallback,
  RayCasterIntersectCallBack,
  SceneManagerOptions
} from "~/core/types";
import Helpers from "~/core/utils/helpers";
import gsap from 'gsap'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneManager {

  /**
   * Static accessor to global scene
   */
  public static GLOBAL_SCENE: SceneManager|null

  // - PROPERTIES
  private _canvas: HTMLCanvasElement
  private _camera: Camera
  private _controls: OrbitControls | null
  private _presetCameraPositions: Array<CameraPosition>
  private _renderer: WebGLRenderer
  private _clock: Clock
  private _mousePositions: Vector2
  private _scene: Scene
  private _rayCaster: Raycaster
  private _stats: Stats | null

  // -- Clock infos
  private _requestId: undefined | number
  private _deltaTime: number
  private _previousTime: number

  // -- Events
  private _onStartCallback: DefaultSceneManagerCallback
  private _onPauseCallback: DefaultSceneManagerCallback
  private _onResumeCallback: DefaultSceneManagerCallback
  private _onDestroyCallback: DefaultSceneManagerCallback
  private _onRenderCallback: DefaultSceneManagerCallback
  private _onRayCasterIntersectCallback: RayCasterIntersectCallBack
  private _onMouseMoveCanvasCallback: MouseMoveCanvasCallback
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
    this._stats = null

    this._onStartCallback = options.onStart || function () {
    }
    this._onPauseCallback = options.onPause || function () {
    }
    this._onResumeCallback = options.onResume || function () {
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
    this._isOrbitControlActivated = options.activateOrbitControl

    this._init()
  }

  // - PUBLIC METHODS
  /**
   * Destroy the scene
   */
  public destroy() {
    this._onDestroyCallback(this)
    if (this._requestId) {
      cancelAnimationFrame(this._requestId)
    }
  }

  /**
   * Pause animations of the scene
   */
  public pause() {
    this._onPauseCallback(this)
    this._isPlaying = false
  }

  /**
   * Resume animations of the scene
   */
  public resume() {
    this._onResumeCallback(this)
    this._isPlaying = true
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
   * Register preset camera positions
   */
  public registerPresetCameraPositions(position: CameraPosition): SceneManager {
    this._presetCameraPositions.push(position)

    return this
  }

  /**
   * Move the camera to the preset position
   */
  public goToPresetPosition(
    name: string,
    duration: number,
    successCallBack: DefaultSceneManagerCallback,
    errorCallBack: DefaultSceneManagerCallback
  ) {
    const cameraPosition = this._presetCameraPositions.find(camPos => camPos.name === name)
    if (!cameraPosition) {
      errorCallBack(this)
      return
    }

    gsap.to(this.camera.position, {
      duration,
      x: cameraPosition.coord.x,
      y: cameraPosition.coord.y,
      z: cameraPosition.coord.z,
      onUpdate: () => {
        if (this._camera instanceof PerspectiveCamera) {
          this._camera.updateProjectionMatrix()
          this.camera.lookAt(cameraPosition.coord)
        }
      },
      onComplete: () => {
        successCallBack(this)
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
  public enableRayCasting()
  {
    this._isRayCasting = true

    return this
  }

  /**
   * Disable RayCasting detection
   */
  public disableRayCasting()
  {
    this._isRayCasting = false

    return this
  }

  /**
   * Enable Stats panel
   */
  public enableStats()
  {
    if (!this._stats) {
      this._stats = Stats()
      this._stats.showPanel(0)
      document.body.appendChild(this._stats.dom)
    }

    this._isStatsActive = true

    return this
  }

  /**
   * Disable stats
   */
  public disableStats()
  {
    this._isStatsActive = false

    return this
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
   * Init intern mandatory events
   */
  public _bindEvents() {
    this._bindExternEvents(this)

    this._canvas.addEventListener('mousemove', event => {
      this._mousePositions.x = event.clientX / this._canvas.width * 2 - 1
      this._mousePositions.y = -(event.clientY / this._canvas.height) * 2 + 1
      this._onMouseMoveCanvasCallback(this, event)
    })
  }

  /**
   * Init renderer
   */
  private _initRenderer() {
    this._renderer.setPixelRatio(Helpers.getWindowRatio())
    this._renderer.setSize(this._canvas.width, this._canvas.height)
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
      const intersects = this._rayCaster.intersectObjects(this._scene.children)
      this._onRayCasterIntersectCallback(this, intersects)
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

  get renderer(): WebGLRenderer {
    return this._renderer
  }

  get scene(): Scene {
    return this._scene
  }

  get mousePositions(): Vector2 {
    return this._mousePositions
  }
}
