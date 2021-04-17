import {ASSET_TYPE} from "~/core/enums";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Asset source
 */
export type AssetSource = {
  name: string
  url: string
  type: ASSET_TYPE
}

/**
 * Common asset element
 */
export interface AssetElement<DataType> {
  source: AssetSource
  data: DataType
}

/**
 * Image asset element
 */
export interface ImageAsset extends AssetElement<HTMLImageElement>{}

/**
 * Video asset element
 */
export interface VideoAsset extends AssetElement<HTMLVideoElement>{}

/**
 * Gltf asset element
 */
export interface GltfAsset extends AssetElement<GLTF>{}

/**
 * Progress Callback
 */
export type ProgressCallback = (done: number, total: number) => void
