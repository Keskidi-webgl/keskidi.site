import {Clock, Intersection, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from "three";
import SceneManager from "~/core/managers/SceneManager";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";

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
  objects: Array<{urlId: URL_OBJECT_IDENTIFIER, interactPointName: INTERACT_POINT_NAME}>
}

export type PresetCameraPosition = {
  name: string
  coords: () => {cameraPos: Vector3, lookAtPosition: Vector3}
}

export type InteractionPointConfigElement = {
  name: INTERACT_POINT_NAME
  isCompleted: () => boolean
  canvasCoords: () => Vector3
  transformX: number
  transformY: number
  url: string
}
