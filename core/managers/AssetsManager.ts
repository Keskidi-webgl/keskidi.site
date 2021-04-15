import {AssetSource, GltfAsset, ImageAsset, ProgressCallback, VideoAsset} from "~/core/types";
import {AssetType} from "~/core/enums";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

class AssetsManager {
  // - PROPERTIES
  private _assetSource: Array<AssetSource>
  private _imageAssets: Array<ImageAsset>
  private _videoAssets: Array<VideoAsset>
  private _gltfAssets: Array<GltfAsset>

  // -- Loaders
  private _gltfLoader: GLTFLoader

  // -- Events
  private _onProgressCallback: ProgressCallback
  private _onSuccessCallback: () => void
  private _onErrorCallback: () => void

  constructor() {
    this._assetSource = []
    this._imageAssets = []
    this._videoAssets = []
    this._gltfAssets = []

    this._gltfLoader = new GLTFLoader()

    this._onProgressCallback = function () {}
    this._onSuccessCallback = function () {}
    this._onErrorCallback = function () {}
  }

  /**
   * Load all assets from sources registered
   */
  public async load() {
    let loadedAssets = 0

    for (const source of this._assetSource) {
      await this._loadAssetFromSource(source)
      loadedAssets++
      this._onProgressCallback(loadedAssets, this._assetSource.length)
    }

    this._onSuccessCallback()
  }

  public onProgress(callback: ProgressCallback) {
    this._onProgressCallback = callback

    return this
  }

  /**
   * Register new gltf asset source
   */
  public registerGltf(name: string, url: string) {
    this._registerSource({name, url, type: AssetType.GLTF})

    return this
  }

  /**
   * Register new video asset source
   */
  public registerVideo(name: string, url: string) {
    this._registerSource({name, url, type: AssetType.VIDEO})

    return this
  }

  /**
   * Register new image asset source
   */
  public registerImage(name: string, url: string) {
    this._registerSource({name, url, type: AssetType.IMAGE})

    return this
  }

  /**
   * Retrieve gltf asset loaded
   */
  public getGltf(name: string): GltfAsset {
    const gltf = this._gltfAssets.find(gltf => gltf.source.name === name)
    if (!gltf) throw new Error(`Gltf asset ${name} is not founded`)

    return gltf
  }

  /**
   * Retrieve image asset loaded
   */
  public getImage(name: string): ImageAsset {
    const image =  this._imageAssets.find(gltf => gltf.source.name === name) || null
    if (!image) throw new Error(`Image asset ${name} is not founded`)

    return image
  }

  /**
   * Retrieve video asset loaded
   */
  public getVideo(name: string): VideoAsset {
    const video = this._videoAssets.find(gltf => gltf.source.name === name) || null
    if (!video) throw new Error(`Video asset ${name} is not founded`)

    return video
  }

  /**
   * Register new asset source
   */
  private _registerSource(source: AssetSource) {
    this._assetSource.push(source)
  }

  /**
   * Handle load asset logic
   */
  private async _loadAssetFromSource(source: AssetSource) {
    try {
      switch (source.type) {
        case AssetType.GLTF:
          await this._loadGltfAsset(source)
          break;
        case AssetType.IMAGE:
          await this._loadImageAsset(source)
          break;
        case AssetType.VIDEO:
          await this._loadVideoAsset(source)
          break;
      }
    } catch (error) {
      this._onErrorCallback()
    }
  }

  /**
   * Gltf loader handler
   */
  private async _loadGltfAsset(source: AssetSource): Promise<void> {
    return new Promise<void>(resolve => {
      this._gltfLoader.load(source.url, gltf => {
        gltf.scene.name = source.name
        this._gltfAssets.push({source, data: gltf})
        resolve()
      })
    })
  }

  /**
   * Image loader handler
   */
  private async _loadImageAsset(source: AssetSource): Promise<void> {
    return new Promise<void>(resolve => {
      const image = new Image()
      image.src = source.url
      this._imageAssets.push({source, data: image})
      resolve()
    })
  }

  /**
   * Video loader handler
   */
  private async _loadVideoAsset(source: AssetSource) {
    const response = await fetch(source.url)
    const video = new HTMLVideoElement()
    video.src = URL.createObjectURL(response.blob())
    this._videoAssets.push({source, data: video})
  }

}

const instance = new AssetsManager()

export default instance
