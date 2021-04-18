import SceneConfig from "~/core/config/scene.config";

/**
 * @description
 * The validator check if params of the scene url are valid
 */
export default class RouteValidator {
  /**
   * Check if roomName exist
   */
  public static validateRoomPageParam(roomName: string) {
    const isValid = SceneConfig.getAllUrlRoomIdentifiers().includes(roomName)

    if (!isValid) {
      console.warn(`
      The route for room "${roomName}" is not valid.
      Be sure that config file exist for this room route -> (core/config/roomConfig/)
      and registered -> (core/config/scene.config.ts)
      `)
    }

    return isValid
  }

  /**
   * Check if roomName exist and objectName belong to roomName
   */
  public static validateObjectPageParam(roomName: string, objectName: string) {
    const roomConfig = SceneConfig.getRoomConfig(roomName)
    const objectConfig = SceneConfig.getObjectFromRoomConfig(roomName, objectName)

    return roomConfig && objectConfig
  }
}
