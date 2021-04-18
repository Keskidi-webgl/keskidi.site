import RoomConfigElement from "~/core/config/roomConfig/RoomConfigElement";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";

class MezzanineConfig extends RoomConfigElement {

  protected _fullUrl = `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`

  protected _nextSceneUrl = `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`

  protected _objects = [
    {urlId: URL_OBJECT_IDENTIFIER.NEON, interactPointName: INTERACT_POINT_NAME.NEON},
    {urlId: URL_OBJECT_IDENTIFIER.TELEVISION, interactPointName: INTERACT_POINT_NAME.TELEVISION},
  ]

  protected _previousSceneUrl = `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`

  protected _urlIdentifier = URL_ROOM_IDENTIFIER.MEZZANINE

}

export default new MezzanineConfig()
