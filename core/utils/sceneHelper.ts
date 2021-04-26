import {HemisphereLight, HemisphereLightHelper, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {SceneManager} from "~/core/managers";

export default class SceneHelper {

  public static createFreshCamera(canvas: HTMLCanvasElement) {
    return new PerspectiveCamera(
      50,
      canvas.width / canvas.height,
      1,
      10000
    )
  }

  public static createFreshScene() {
    return new Scene()
  }

  public static createFreshRenderer(canvas: HTMLCanvasElement) {
    return new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
  }

  public static createFreshHemisphereLight(withHelper: boolean = false) {
    const hemisphereLights = new HemisphereLight(0xdff9fb, 0x080820, 1);
    if (withHelper) {
      const helper = new HemisphereLightHelper(hemisphereLights, 5);
    }

    return hemisphereLights
  }

  public static createStarterSceneContext(canvas: HTMLCanvasElement) {
    const camera = SceneHelper.createFreshCamera(canvas)
    const scene = SceneHelper.createFreshScene()
    const renderer = SceneHelper.createFreshRenderer(canvas)

    return {
      camera,
      scene,
      renderer
    }
  }
}
