import {GLTF_ASSET} from "~/core/enums";

export type Cloud = {
  x: number,
  y: number,
  z: number,
  rotationY: number
  type: GLTF_ASSET.CLOUD_LITTLE | GLTF_ASSET.CLOUD_BIG
}
