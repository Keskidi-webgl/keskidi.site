import RoomConfigElement from "~/core/config/roomConfig/RoomConfigElement";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";

class LoungeConfig extends RoomConfigElement {

  protected _fullUrl = `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`

  protected _nextSceneUrl = `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`

  protected _objects = [
    {urlId: URL_OBJECT_IDENTIFIER.LOUNGE_POSTER, interactPointName: INTERACT_POINT_NAME.LOUNGE_POSTER},
    {urlId: URL_OBJECT_IDENTIFIER.VINYL, interactPointName: INTERACT_POINT_NAME.VINYL},
    {urlId: URL_OBJECT_IDENTIFIER.MAGAZINE, interactPointName: INTERACT_POINT_NAME.MAGAZINE},
  ]

  protected _previousSceneUrl = `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`

  protected _urlIdentifier = URL_ROOM_IDENTIFIER.LOUNGE

}

export default new LoungeConfig()
