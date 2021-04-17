import {URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {RoomConfigElement} from "~/core/types";

class SceneConfig {
  public rooms: Array<RoomConfigElement> = [
    {
      urlIdentifier: URL_ROOM_IDENTIFIER.MEZZANINE,
      fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,
      nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,
      previousUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,
      objects: [
        URL_OBJECT_IDENTIFIER.NEON,
        URL_OBJECT_IDENTIFIER.TELEVISION,
        URL_OBJECT_IDENTIFIER.POSTER
      ]
    },
    {
      urlIdentifier: URL_ROOM_IDENTIFIER.LOUNGE,
      fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,
      nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,
      previousUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,
      objects: [
        URL_OBJECT_IDENTIFIER.VINYL,
        URL_OBJECT_IDENTIFIER.POSTER,
        URL_OBJECT_IDENTIFIER.MAGAZINE
      ]
    },
    {
      urlIdentifier: URL_ROOM_IDENTIFIER.BEDROOM,
      fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,
      nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,
      previousUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,
      objects: [
        URL_OBJECT_IDENTIFIER.T_SHIRT,
        URL_OBJECT_IDENTIFIER.AGENDA,
        URL_OBJECT_IDENTIFIER.POSTER
      ]
    }
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
}

const instance = new SceneConfig()

export default instance
