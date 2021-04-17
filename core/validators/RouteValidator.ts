import UrlConfig from "~/core/config/url.config";

export default class RouteValidator {
  /**
   * Check if roomName exist
   */
  public static validateRoomPageParam(roomName: string) {
    const availableUrlRoomName = this.getAvailableUrlRoomName()

    return availableUrlRoomName.includes(roomName)
  }

  /**
   * Check if roomName exist and objectName belong to roomName
   */
  public static validateObjectPageParam(roomName: string, objectName: string) {
    const room = UrlConfig.rooms.find(room => room.urlIdentifier === roomName)

    return room && (<Array<string>>room.objects).includes(objectName)
  }

  /**
   * Return all available url room name (bedroom, lounge et mezzanine)
   */
  public static getAvailableUrlRoomName() {
    const urlRoomName: Array<string> = []

    UrlConfig.rooms.forEach(room => {
      urlRoomName.push(room.urlIdentifier)
    })

    return urlRoomName
  }
}
