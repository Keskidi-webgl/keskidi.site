import {Initializers} from "~/core/defs";
import SceneHelper from "~/core/utils/sceneHelper";
import {SceneManager} from "~/core/managers";
import TomSceneElement from "~/core/scene/TomSceneElement";

export default class TomSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement }, void> {
  init(): void {
    SceneManager.ACTIVITY_1_TOM = this._createTomScene()
  }

  private _createTomScene() {
    const {camera, scene, renderer} = SceneHelper.createStarterSceneContext(this._data.canvas)

    const sceneContext = new SceneManager({
      canvas: this._data.canvas,
      camera,
      scene,
      renderer,
      defaultRation: 2,
      activateOrbitControl: false,
    })

    TomSceneElement.setupForActivityScene()
    camera.position.set(0, 10, 25)

    const light = SceneHelper.createFreshHemisphereLight()
    light.position.z = 10
    sceneContext.scene.add(light)

    sceneContext.scene.add(TomSceneElement.sceneElement)
    return sceneContext


  }
}
