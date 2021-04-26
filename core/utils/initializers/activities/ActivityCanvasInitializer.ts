import {Initializers} from "~/core/defs";
import {Word} from "~/core/types";
import {AssetsManager, SceneManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";
import SceneHelper from "~/core/utils/sceneHelper";

export default abstract class ActivityCanvasInitializer<OptionData, InitReturn> extends Initializers<OptionData, InitReturn> {

  /**
   * Return gltf object representation of current word
   */
  protected _getGltfWordRepresentation(dataWord: Word) {
    return AssetsManager.getGltf(dataWord.activity_data!.good_object).data
  }

  /**
   * Return Tom gltf object
   */
  protected _getTomGltf() {
    return AssetsManager.getGltf(GLTF_ASSET.TOM).data
  }

  /**
   * Create Tom Scene used into three activities
   */
  protected _createTomScene(canvas: HTMLCanvasElement) {
    const {camera, scene, renderer} = SceneHelper.createStarterSceneContext(canvas)

    const sceneContext = new SceneManager({
      canvas,
      camera,
      scene,
      renderer,
      defaultRation: 2,
      activateOrbitControl: true,
    })

    const tomGltf = this._getTomGltf()
    tomGltf.scene.position.set(0, 0, 0)
    tomGltf.scene.scale.set(0.2,0.2,0.2)

    const light = SceneHelper.createFreshHemisphereLight()
    light.position.z = 10
    sceneContext.scene.add(light)

    sceneContext.scene.add(tomGltf.scene)

    return sceneContext
  }

}
