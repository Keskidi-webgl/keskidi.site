import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {RoomConfig} from "~/core/types";

const BedroomConfig: RoomConfig = {
  urlIdentifier: URL_ROOM_IDENTIFIER.BEDROOM,

  nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,

  previousSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,

  fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,

  objects: [
    {urlId: URL_OBJECT_IDENTIFIER.T_SHIRT, interactPointName: INTERACT_POINT_NAME.T_SHIRT},
    {urlId: URL_OBJECT_IDENTIFIER.SKATE, interactPointName: INTERACT_POINT_NAME.SKATE},
    {urlId: URL_OBJECT_IDENTIFIER.PAPER, interactPointName: INTERACT_POINT_NAME.PAPER},
  ]
}

export default BedroomConfig
