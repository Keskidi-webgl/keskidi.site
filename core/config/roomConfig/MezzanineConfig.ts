import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {RoomConfig} from "~/core/types";

const MezzanineConfig: RoomConfig = {
  urlIdentifier: URL_ROOM_IDENTIFIER.MEZZANINE,

  nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,

  previousSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,

  fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,

  objects: [
    {urlId: URL_OBJECT_IDENTIFIER.NEON, interactPointName: INTERACT_POINT_NAME.NEON},
    {urlId: URL_OBJECT_IDENTIFIER.TELEVISION, interactPointName: INTERACT_POINT_NAME.TELEVISION},
  ]
}

export default MezzanineConfig
