import {Middleware} from "@nuxt/types";
import ApiManager from "~/core/managers/ApiManager";

const middleware: Middleware = context => {
  console.log('yolo middleware')
  ApiManager.setAxios(context.$axios)
}

export default middleware
