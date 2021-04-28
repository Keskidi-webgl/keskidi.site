import { Plugin } from '@nuxt/types'
import {getModule} from "nuxt-property-decorator";
import AuthStore from "~/store/auth";


const axiosPlugin: Plugin = context => {
  const authStore = getModule(AuthStore, context.store)
  context.$axios.onRequest(config => {
    if (authStore.isAuth) {
      config.headers.common['Authorization'] = `Bearer ${authStore.token}`
    }
  })
}

export default axiosPlugin
