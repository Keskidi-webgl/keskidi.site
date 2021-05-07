import {
  HemisphereLight,
  HemisphereLightHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";
import {Object3D} from "three/src/core/Object3D";
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

  public static replaceByBasicMaterial(objectList: Array<Object3D>, sceneContext: SceneManager, isExcluded: boolean = false) {
    const names: Array<string> = []
    objectList.forEach(obj => {
      names.push(obj.name)
      names.push(...SceneHelper.getChildrenNames(obj))
    })

    sceneContext.scene.traverse(child => {
      const condition = isExcluded ? !names.includes(child.name) : names.includes(child.name)
      if (child instanceof Mesh && condition) {
        const prevMaterial = child.material
        const newMaterial = new MeshBasicMaterial()
        newMaterial.copy((prevMaterial))

        if (prevMaterial.map === null && prevMaterial.emissiveMap) {
          newMaterial.map = prevMaterial.emissiveMap
        }

        child.material = newMaterial
      }
    })
  }

  private static getChildrenNames(object3D: Object3D): string[] {
    const children: string[] = []
    object3D.traverse((child) => {
      children.push(child.name)
    })
    return children
  }
}
