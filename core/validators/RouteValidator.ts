/**
 * @description
 * The validator check if params of the scene url are valid
 */
import GlobalSceneHelper from "~/core/config/global-scene/GlobalSceneHelper";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";

export default class RouteValidator {
  /**
   * Check if roomName exist
   */
  public static validateRoomSlug(roomSlug: ROOM_SLUG) {
    const isValid = GlobalSceneHelper.allRooms().map(room => room.urlSlug).includes(roomSlug)

    if (!isValid) {
      console.warn(`
      The route for room "${roomSlug}" is not valid.
      Be sure that config file exist for this room route -> (core/config/global-scene/rooms)
      and registered -> (core/config/global-scene/global-scene.config.ts)
      `)
    }

    return isValid
  }

  /**
   * Check if roomName exist and objectName belong to roomName
   */
  public static validateRoomObjectSlug(roomSlug: ROOM_SLUG, roomObjectSlug: ROOM_OBJECT_SLUG) {
    let isValid = true

    try {
      const room = GlobalSceneHelper.getRoomBySlug(roomSlug)
      const roomObjectFromUrl = GlobalSceneHelper.getRoomObjectBySlug(roomObjectSlug)
      isValid = isValid && room.objects.some(roomObject => roomObject.urlSlug === roomObjectFromUrl.urlSlug)
    } catch (error) {
      isValid = false
    }

    return isValid
  }
}
