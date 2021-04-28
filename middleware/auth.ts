import {getModule} from "nuxt-property-decorator";
import AuthStore from "~/store/auth";
import {Context} from "@nuxt/types/app";
import GlobalStore from "~/store/global";
import {ApiManager} from "~/core/managers";


export default class AuthMiddleware {
  public static  async handle(ctx: Context) {
    const authStore = getModule(AuthStore, ctx.store)
    const globalStore = getModule(GlobalStore, ctx.store)
    if (!authStore.isAuth) {
      ctx.redirect('/tom')
    }

    if (authStore.isAuth && !globalStore.userWordData) {
      const {data} = await ApiManager.request({
        url: `/users/${authStore.user!.id}/words`
      })

      globalStore.setUserWordData(data)
    }
  }
}
