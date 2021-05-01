import {Initializers} from "~/core/defs";
import SceneHelper from "~/core/utils/sceneHelper";
import {AssetsManager, SceneManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";

export default class TomSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement }, void>{
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
      activateOrbitControl: true,
      onRender: (ctx) => {
      }
    })

    const tomGltf = AssetsManager.getFbx(GLTF_ASSET.TOM).data.clone()
    tomGltf.position.set(0, 0, 0)
    camera.position.set(0, 0, 50)

    const light = SceneHelper.createFreshHemisphereLight()
    light.position.z = 10
    sceneContext.scene.add(light)

    sceneContext.scene.add(tomGltf)

    return sceneContext


  }
}
