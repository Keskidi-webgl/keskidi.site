import {Initializers} from "~/core/defs";
import {AssetsManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";

/**
 * @description
 * This initializer is responsible for initialize AssetManager
 */
export default class AssetManagerInitializer extends Initializers<null, void> {
  init(): void {
    AssetsManager.enableLocalMode()

      .registerGltf(
        GLTF_ASSET.ACTIVITY_OBJECT_WATCH,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/montre.gltf"
      )
      .registerGltf(
        GLTF_ASSET.ACTIVITY_OBJECT_BEER,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/tise.gltf"
      )
      .registerGltf(
        GLTF_ASSET.ACTIVITY_OBJECT_BOOK,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/livre.gltf"
      )
      .registerGltf(
        GLTF_ASSET.ACTIVITY_OBJECT_CHICKEN,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/poulet.gltf"
      )
      .registerGltf(
        GLTF_ASSET.ACTIVITY_OBJECT_MOULA,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/moulaga.gltf",
        "moulaga.gltf"
      )
      .registerGltf(
        GLTF_ASSET.ACTIVITY_OBJECT_NOOB,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/pouce_bad.gltf",
        "pouce_bad.gltf"
      )
      .registerGltf(
        GLTF_ASSET.GLOBAL_SCENE,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/scene_global_no_bake.gltf",
        "scene_globale_bake.gltf"
      )
      .registerGltf(
        GLTF_ASSET.ACTIVITY_OBJECT_CRUSH,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/crush-enveloppe.gltf",
        "enveloppe.gltf"
      )

      .registerFbx(
        GLTF_ASSET.TOM,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_idle.fbx",
        "perso_idle.fbx"
      )
      .registerFbx(
        GLTF_ASSET.TOM_MUSCLE,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_good_muscle.fbx",
        "perso_good_muscle.fbx"
      )
  }
}
