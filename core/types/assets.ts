import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

export type AssetSource = {
  name: string
  url: string
}

export type AssetElement = {
  gltf: GLTF,
  name: string,
  url: string
}
