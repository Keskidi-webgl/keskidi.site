import {getModule} from "nuxt-property-decorator";
import AuthModule from "~/store/auth";
import {Context} from "@nuxt/types/app";
import GlobalModule from "~/store/global";
import {ApiManager} from "~/core/managers";


export default class AuthMiddleware {
  public static  async handle(ctx: Context) {
    const authModule = getModule(AuthModule, ctx.store)
    const globalModule = getModule(GlobalModule, ctx.store)
    if (!authModule.isAuth) {
      ctx.redirect('/tom')
    }

    if (authModule.isAuth && !globalModule.userWordData) {
      const {data} = await ApiManager.request({
        url: `/users/${authModule.user!.id}/words`
      })

      globalModule.setUserWordData(data)
    }
  }
}
