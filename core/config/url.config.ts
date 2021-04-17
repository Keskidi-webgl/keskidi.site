import {URL_OBJECT_NAME, URL_ROOM_NAME} from "~/core/enums";


const UrlConfig = {
  rooms: [
    {
      urlIdentifier: URL_ROOM_NAME.BEDROOM,
      objects: [
        URL_OBJECT_NAME.T_SHIRT,
        URL_OBJECT_NAME.AGENDA,
        URL_OBJECT_NAME.POSTER
      ]
    },
    {
      urlIdentifier: URL_ROOM_NAME.MEZZANINE,
      objects: [
        URL_OBJECT_NAME.NEON,
        URL_OBJECT_NAME.TELEVISION,
        URL_OBJECT_NAME.POSTER
      ]
    },
    {
      urlIdentifier: URL_ROOM_NAME.LOUNGE,
      objects: [
        URL_OBJECT_NAME.VINYL,
        URL_OBJECT_NAME.POSTER,
        URL_OBJECT_NAME.MAGAZINE
      ]
    }
  ]
}

export default UrlConfig
