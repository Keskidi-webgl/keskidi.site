import RoomConfigElement from "~/core/config/roomConfig/RoomConfigElement";
import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";

class BedroomConfig extends RoomConfigElement {

  protected _fullUrl = `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`

  protected _nextSceneUrl = `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`

  protected _objects = [
    {urlId: URL_OBJECT_IDENTIFIER.T_SHIRT, interactPointName: INTERACT_POINT_NAME.T_SHIRT},
    {urlId: URL_OBJECT_IDENTIFIER.SKATE, interactPointName: INTERACT_POINT_NAME.SKATE},
    {urlId: URL_OBJECT_IDENTIFIER.PAPER, interactPointName: INTERACT_POINT_NAME.PAPER},
  ]

  protected _previousSceneUrl = `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`

  protected _urlIdentifier = URL_ROOM_IDENTIFIER.BEDROOM

}

export default new BedroomConfig()
