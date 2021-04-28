import {Room} from "~/core/config/global-scene/rooms/types";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";
import {WORD_ID} from "~/core/enums/word";

export type RoomObject = {
  name: string
  urlSlug: ROOM_OBJECT_SLUG
  room: () => Room
  fullUrl: string
  wordId: WORD_ID
}
