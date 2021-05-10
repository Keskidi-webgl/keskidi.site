import { ROOM_OBJECT_SLUG } from "~/core/config/global-scene/room-objects/enums";
import { Bedroom } from "~/core/config/global-scene/rooms";
import { WORD_ID } from "~/core/enums/word";
import { RoomObject } from "~/core/config/global-scene/room-objects/types";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import { AssetsManager } from "~/core/managers";
import { AUDIO_ASSET, GLTF_ASSET } from "~/core/enums";
import { LoopOnce } from "three";
import gsap from "gsap";

const SkateRoomObject: RoomObject = {
  name: "skate",
  nameForHuman: "Hendeks",
  urlSlug: ROOM_OBJECT_SLUG.SKATE,
  room: () => Bedroom,

  fullUrl: `/rooms/${ROOM_SLUG.BEDROOM}/${ROOM_OBJECT_SLUG.SKATE}`,
  wordId: WORD_ID.HENDEK,
  animation: () => {
    const gltfObject = AssetsManager.getGltf(GLTF_ASSET.SKATE_STICKER).data!;
    const animationClip = GlobalScene.context.generateAnimationAction(
      gltfObject.animations[0],
      GLTF_ASSET.SKATE_STICKER
    );
    animationClip.clampWhenFinished = true;
    animationClip.setLoop(LoopOnce, 1);
    animationClip.play();
    animationClip.reset();
    gsap.to(AssetsManager.getAudio(AUDIO_ASSET.SKATE_STICKERS).data, {
      duration: 0.4,
      onComplete: () => {
        AssetsManager.getAudio(AUDIO_ASSET.SKATE_STICKERS).data.play();
      }
    });
  }
};

export default SkateRoomObject;
