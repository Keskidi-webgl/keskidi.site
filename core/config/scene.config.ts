import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {InteractionPointConfigElement, RoomConfigElement} from "~/core/types";
import {SceneManager} from "~/core/managers";
import {Vector3} from "three";

class SceneConfig {
  // Room configuration
  public rooms: Array<RoomConfigElement> = [
    {
      urlIdentifier: URL_ROOM_IDENTIFIER.MEZZANINE,
      fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,
      nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,
      previousUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,
      objects: [
        {urlId: URL_OBJECT_IDENTIFIER.NEON, interactPointName: INTERACT_POINT_NAME.TELEVISION},
        {urlId: URL_OBJECT_IDENTIFIER.TELEVISION, interactPointName: INTERACT_POINT_NAME.TELEVISION},
        {urlId: URL_OBJECT_IDENTIFIER.POSTER, interactPointName: INTERACT_POINT_NAME.TELEVISION},
      ]
    },
    {
      urlIdentifier: URL_ROOM_IDENTIFIER.LOUNGE,
      fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,
      nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,
      previousUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,

      objects: [
        /*
        {urlId: URL_OBJECT_IDENTIFIER.VINYL, interactPointName: INTERACT_POINT_NAME.TELEVISION},
        {urlId: URL_OBJECT_IDENTIFIER.POSTER, interactPointName: INTERACT_POINT_NAME.TELEVISION},
        {urlId: URL_OBJECT_IDENTIFIER.MAGAZINE, interactPointName: INTERACT_POINT_NAME.TELEVISION},
         */
      ]
    },
    {
      urlIdentifier: URL_ROOM_IDENTIFIER.BEDROOM,
      fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,
      nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,
      previousUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,
      objects: [
        /*
        {urlId: URL_OBJECT_IDENTIFIER.T_SHIRT, interactPointName: INTERACT_POINT_NAME.TELEVISION},
        {urlId: URL_OBJECT_IDENTIFIER.AGENDA, interactPointName: INTERACT_POINT_NAME.TELEVISION},
        {urlId: URL_OBJECT_IDENTIFIER.POSTER, interactPointName: INTERACT_POINT_NAME.TELEVISION},
         */
      ]
    }
  ]

  public interactionPoints: Array<InteractionPointConfigElement> = [
    /* Bedroom */
    {
      name: INTERACT_POINT_NAME.BEDROOM,
      canvasCoords() {
        return SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
      },
      isCompleted() { return false },
      transformX: 0,
      transformY: 0,
      url: this.getRoomConfig(URL_ROOM_IDENTIFIER.BEDROOM)!.fullUrl
    },
    /* Mezzanine */
    {
      name: INTERACT_POINT_NAME.MEZZANINE,
      canvasCoords() {
        return SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.position
      },
      isCompleted() { return false },
      transformX: 0,
      transformY: 0,
      url: this.getRoomConfig(URL_ROOM_IDENTIFIER.MEZZANINE)!.fullUrl
    },
    /* Lounge */
    {
      name: INTERACT_POINT_NAME.LOUNGE,
      canvasCoords() {
        return SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.position
      },
      isCompleted() { return false },
      transformX: 0,
      transformY: 0,
      url: this.getRoomConfig(URL_ROOM_IDENTIFIER.LOUNGE)!.fullUrl
    },
    /* Television of mezzanine*/
    {
      name: INTERACT_POINT_NAME.TELEVISION,
      canvasCoords() {
        const position = new Vector3()
        SceneManager.GLOBAL_SCENE.scene.getObjectByName('tv')!.getWorldPosition(position)

        return position
      },
      isCompleted() { return Math.random() < 0.5 },
      transformX: 0,
      transformY: 0,
      url: this.getRoomConfig(URL_ROOM_IDENTIFIER.LOUNGE)!.fullUrl + '/' + URL_OBJECT_IDENTIFIER.TELEVISION
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
