import {Camera, Clock, Intersection, Scene, Vector2, Vector3, WebGLRenderer} from "three";
import SceneManager from "~/core/managers/SceneManager";

/**
 * Option to create SceneManager
 */
export type SceneManagerOptions = {
  camera: Camera
  canvas: HTMLCanvasElement
  clock?: Clock
  render: WebGLRenderer
  scene: Scene
  bindEvents: DefaultSceneManagerCallback

  onStart?: DefaultSceneManagerCallback
  onPause?: DefaultSceneManagerCallback
  onResume?: DefaultSceneManagerCallback
  onDestroy?: DefaultSceneManagerCallback
  onMouseMoveCanvas?: MouseMoveCanvasCallback
  onRender?: DefaultSceneManagerCallback
  onRayCasterIntersect?: RayCasterIntersectCallBack

  activateOrbitControl: boolean
}

/**
 * Default callback function for SceneManager
 */
export type DefaultSceneManagerCallback = (context: SceneManager) => void

export type RayCasterIntersectCallBack = (context: SceneManager, intersects: Array<Intersection>) => void

export type MouseMoveCanvasCallback = (context: SceneManager, event: MouseEvent) => void
/**
 * Preset camera positions
 */
export type CameraPosition = {
  name: string
  coord: Vector3
}

/**
 * Canvas dimension
 */
export type CanvasDimension = {
  width: number
  height: number
}
