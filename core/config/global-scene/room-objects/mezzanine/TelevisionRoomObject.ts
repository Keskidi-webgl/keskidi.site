import {RoomObject} from "~/core/config/global-scene/room-objects/types";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";
import {Mezzanine} from "~/core/config/global-scene/rooms";
import {WORD_ID} from "~/core/enums/word";

const TelevisionRoomObject: RoomObject = {
  name: 'television',
  urlSlug: ROOM_OBJECT_SLUG.TELEVISION,
  room: Mezzanine,

  fullUrl: `${Mezzanine.fullUrl}/${ROOM_OBJECT_SLUG.TELEVISION}`,
  wordId: WORD_ID.NOOB
}

export default TelevisionRoomObject
