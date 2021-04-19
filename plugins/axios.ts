import { Plugin } from '@nuxt/types'
import {getModule} from "nuxt-property-decorator";
import AuthModule from "~/store/auth";


const axiosPlugin: Plugin = context => {
  const authModule = getModule(AuthModule, context.store)
  context.$axios.onRequest(config => {
    if (authModule.isAuth) {
      config.headers.common['Authorization'] = `Bearer ${authModule.token}`
    }
  })
}

export default axiosPlugin
