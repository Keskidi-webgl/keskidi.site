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
    return SceneConfig.getAllUrlRoomIdentifiers().includes(roomName)
  }

  /**
   * Check if roomName exist and objectName belong to roomName
   */
  public static validateObjectPageParam(roomName: string, objectName: string) {
    const roomConfig = SceneConfig.getRoomConfig(roomName)

    return roomConfig && (<Array<string>>roomConfig.objects).includes(objectName)
  }
}
