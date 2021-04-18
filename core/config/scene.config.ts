import {INTERACT_POINT_NAME} from "~/core/enums";
import RoomConfigElement from "~/core/config/roomConfig/RoomConfigElement";
import {BedroomConfig, LoungeConfig, MezzanineConfig} from "~/core/config/roomConfig";
import InteractPointConfigElement from "~/core/config/interactPointsConfig/InteractPointConfigElement";
import {
  BedroomInteractPointConfig,
  LoungeInteractPointConfig, LoungePosterInteractPointConfig, MagazineInteractPointConfig,
  MezzanineInteractPointConfig,
  NeonInteractPointConfig, PaperInteractPointConfig, SkateInteractPointConfig,
  TelevisionInteractPointConfig, TshirtInteractPointConfig, VinylInteractPointConfig
} from "~/core/config/interactPointsConfig";

class SceneConfig {
  public rooms: Array<RoomConfigElement> = [
    BedroomConfig,
    MezzanineConfig,
    LoungeConfig
  ]

  public interactionPoints: Array<InteractPointConfigElement> = [
    // Global
    MezzanineInteractPointConfig,
    LoungeInteractPointConfig,
    BedroomInteractPointConfig,

    // Mezzanine
    NeonInteractPointConfig,
    TelevisionInteractPointConfig,

    // Lounge
    LoungePosterInteractPointConfig,
    VinylInteractPointConfig,
    MagazineInteractPointConfig,

    // Bedroom
    TshirtInteractPointConfig,
    SkateInteractPointConfig,
    PaperInteractPointConfig
  ]

  /**
   * Return room config
   */
  getRoomConfig(roomIdentifier: string) {
    return this.rooms.find(room => room.urlIdentifier === roomIdentifier) || null
  }

  /**
   * Return all room url identifiers (lounge, bedroom, mezzanine)
   */
  getAllUrlRoomIdentifiers() {
    const identifiers: Array<string> = []

    this.rooms.forEach(room => {
      identifiers.push(room.urlIdentifier)
    })

    return identifiers
  }

  /**
   * Return object info for a given room identifier and object identifier
   */
  getObjectFromRoomConfig(roomIdentifier: string, objectIdentifier: string) {
    let object = null
    const room = this.getRoomConfig(roomIdentifier)
    if (room) {
      object = room.objects.find(object => object.urlId === objectIdentifier)
    }

    return object
  }

  getInteractionPoint(name: INTERACT_POINT_NAME) {
    return this.interactionPoints.find(interactPoint => interactPoint.name === name)
  }
}

const instance = new SceneConfig()

export default instance
