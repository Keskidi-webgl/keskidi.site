import { RoomObject } from "~/core/config/global-scene/room-objects/types";
import { ROOM_OBJECT_SLUG } from "~/core/config/global-scene/room-objects/enums";
import { Mezzanine } from "~/core/config/global-scene/rooms";
import { WORD_ID } from "~/core/enums/word";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";
import {AssetsManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import {LoopOnce} from "three";

const PhoneRoomObject: RoomObject = {
  name: "phone",
  nameForHuman: "Ghoster",
  urlSlug: ROOM_OBJECT_SLUG.PHONE,
  room: () => Mezzanine,

  fullUrl: `/rooms/${ROOM_SLUG.MEZZANINE}/${ROOM_OBJECT_SLUG.PHONE}`,
  wordId: WORD_ID.GHOSTER,
  animation: () => {
    const gltfObject = AssetsManager.getGltf(GLTF_ASSET.PHONE).data!
    const animationClip = GlobalScene.context.generateAnimationAction(gltfObject.animations[0], GLTF_ASSET.PHONE)
    animationClip.clampWhenFinished = true
    animationClip.setLoop(LoopOnce, 1)
    animationClip.play()
    animationClip.reset()
  }
};

export default PhoneRoomObject;
