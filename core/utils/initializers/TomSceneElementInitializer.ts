import {Initializers} from "~/core/defs";
import TomSceneElement from "~/core/scene/TomSceneElement";
import {AssetsManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";

export default class TomSceneElementInitializer extends Initializers<null, void> {

  public init(): void {
    TomSceneElement
      .setSceneElement(AssetsManager.getFbx(GLTF_ASSET.TOM).data)
      .setAnimations({
        idle: AssetsManager.getFbx(GLTF_ASSET.TOM).data.animations[0],
        muscle: AssetsManager.getFbx(GLTF_ASSET.TOM_MUSCLE).data.animations[0],
      })
  }
}
