import {Module, Mutation, VuexModule} from "vuex-module-decorators";


@Module({
  name: 'admin',
  namespaced: true,
  stateFactory: true,
})
export default class AdminModule extends VuexModule {
  private _adminMenu = {
    links: [] as Array<AdminMenuLink>
  }

  @Mutation
  public setBasicMenu()
  {
    this._adminMenu.links = [
      {
        name: 'Home',
        to: '/admin',
        icon: 'home'
      },
      {
        name: 'Upload',
        to: '/admin/upload',
        icon: 'upload'
      },
      {
        name: 'Words',
        to: '/admin/words',
        icon: 'align-left'
      }
    ]
  }

  get adminMenu()
  {
    return this._adminMenu
  }
}

type AdminMenuLink = {
  name: string,
  to: string,
  icon: string
}
