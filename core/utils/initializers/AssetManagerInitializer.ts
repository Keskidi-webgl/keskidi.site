import {Initializers} from "~/core/defs";
import {AssetsManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";

/**
 * @description
 * This initializer is responsible for initialize AssetManager
 */
export default class AssetManagerInitializer extends Initializers<null, void> {
  init(): void {
    AssetsManager
      .enableLocalMode()
      .registerGltf(
        GLTF_ASSET.CLOUD_LITTLE,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/nuage_1.gltf",
        "nuage_1.gltf"
      )
      .registerGltf(
        GLTF_ASSET.CLOUD_BIG,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/nuage_2.gltf",
        "nuage_2.gltf"
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
      .registerFbx(
        GLTF_ASSET.TOM_DOWN,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_bad_down.fbx",
        "perso_bad_down.fbx"
      )
      .registerFbx(
        GLTF_ASSET.TOM_PUNCH,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_good_poing.fbx",
        "perso_good_poing.fbx"
      )
      .registerFbx(
        GLTF_ASSET.TOM_HEAD,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_bad_1.fbx",
        "perso_bad_1.fbx"
      )

      .registerGltf(
        GLTF_ASSET.GLOBAL_SCENE,
        "https://keskidi.s3.eu-west-3.amazonaws.com/medias/scene_globale_bake.gltf",
        "scene_globale_bake.gltf"
      )
  }
}
