import {INTERACT_POINT_NAME, URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {RoomConfig} from "~/core/types";

const LoungeConfig: RoomConfig = {
  urlIdentifier: URL_ROOM_IDENTIFIER.LOUNGE,

  nextSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.BEDROOM}`,

  previousSceneUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,

  fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.LOUNGE}`,

  objects: [
    {urlId: URL_OBJECT_IDENTIFIER.LOUNGE_POSTER, interactPointName: INTERACT_POINT_NAME.LOUNGE_POSTER},
    {urlId: URL_OBJECT_IDENTIFIER.VINYL, interactPointName: INTERACT_POINT_NAME.VINYL},
    {urlId: URL_OBJECT_IDENTIFIER.MAGAZINE, interactPointName: INTERACT_POINT_NAME.MAGAZINE},
  ]
}

export default LoungeConfig
