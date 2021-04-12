import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
  name: 'exercice',
  namespaced: true,
  stateFactory: true, })

export default class Exercice extends VuexModule {
  _exostatus = false

  @Mutation
  setStatus(status: boolean) {
    this._exostatus = status
  }

}
