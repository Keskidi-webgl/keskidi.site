import { getModule } from "nuxt-property-decorator";
import AuthStore from "~/store/auth";
import { Context } from "@nuxt/types/app";
import GlobalStore from "~/store/global";
import { ApiManager } from "~/core/managers";

export default class AuthMiddleware {
  // TODO accéder aux données utilisateur sur la home (pour la progress bar level notamment)

  public static async handle(ctx: Context) {
    const authStore = getModule(AuthStore, ctx.store);
    const globalStore = getModule(GlobalStore, ctx.store);
    if (!authStore.isAuth) {
      ctx.redirect("/tom");
    }

    if (authStore.isAuth && !globalStore.userWordData) {
      const { data } = await ApiManager.request({
        url: `/users/${authStore.user!.id}/words`
      });

      globalStore.setUserWordData(data);
    }
  }
}
