import {Clock, Intersection, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from "three";
import SceneManager from "~/core/managers/SceneManager";
import {URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {GUI} from "dat.gui";

/**
 * Option to create SceneManager
 */
export type SceneManagerOptions = {
  camera: PerspectiveCamera
  canvas: HTMLCanvasElement
  clock?: Clock
  renderer: WebGLRenderer
  scene: Scene
  bindEvents?: DefaultSceneManagerCallback
  gui?:GUI
  defaultRation?: number

  onStart?: DefaultSceneManagerCallback
  onPause?: DefaultSceneManagerCallback
  onResume?: DefaultSceneManagerCallback
  onDestroy?: DefaultSceneManagerCallback
  onMouseMoveCanvas?: MouseMoveCanvasCallback
  onWindowResize?: WindowResizeCallback
  onRender?: DefaultSceneManagerCallback
  onRayCasterIntersect?: RayCasterIntersectCallBack

  activateOrbitControl: boolean
}

/**
 * Default callback function for SceneManager
 */
export type DefaultSceneManagerCallback = (context: SceneManager) => void

/**
 * Callback for rayCaster intersection event
 */
export type RayCasterIntersectCallBack = (context: SceneManager, intersects: Array<Intersection>) => void

/**
 * Callback when mouse move on canvas
 */
export type MouseMoveCanvasCallback = (context: SceneManager, event: MouseEvent) => void

/**
 * Callback for SceneManager when windows is resized
 */
export type WindowResizeCallback = (context: SceneManager, event: UIEvent) => void

/**
 * Preset camera positions
 */
export type CameraPosition = {
  name: string
  coords: Vector3
}

/**
 * Canvas dimension
 */
export type CanvasDimension = {
  width: number
  height: number
}

/**
 * Room config element for scene.config.ts file
 */
export type RoomConfigElement = {
  urlIdentifier: URL_ROOM_IDENTIFIER
  fullUrl: string,
  nextSceneUrl: string,
  previousUrl: string,
  objects: Array<URL_OBJECT_IDENTIFIER>
}

export type PresetCameraPositionConfig = {
  name: string
  coords: () => Vector3
}
