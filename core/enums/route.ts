/**
 * List of identifier of route in the URL
 *
 * @example
 * https://keskidi.site/rooms/mezzanine -> "mezzanine" is the identifier the room mezzanine
 */
export enum URL_ROOM_IDENTIFIER {
  BEDROOM = 'bedroom',
  MEZZANINE = 'mezzanine',
  LOUNGE = 'lounge'
}

/**
 * List of identifier of route in the URL
 *
 * @example
 * https://keskidi.site/rooms/mezzanine/neon -> "neon" is the identifier the object neon
 */
export enum URL_OBJECT_IDENTIFIER {
  T_SHIRT = 't-shirt',
  AGENDA = 'agenda',
  POSTER = 'poster',
  NEON = 'neon',
  TELEVISION = 'television',
  VINYL = 'vinyl',
  MAGAZINE = 'magazine'
}
