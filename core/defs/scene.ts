export interface SceneInteractor {
  dataInteractivePoints: DataInteractivePoints
}

type DataInteractivePoints = { [key: string]: {url: string} }
