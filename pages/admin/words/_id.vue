<template>
  <div class="admin-page">
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>

    <!-- Header panel -->
    <div v-if="wordData" class="header-panel">
      <nuxt-link to="/admin/words">Retourner à la liste de mots</nuxt-link>
      <h1>{{ wordData.name.toUpperCase() }}</h1>
    </div>

    <div class="panel-container">
      <!-- Definitions -->
      <DefinitionWordPanel
        class="mb-3"
        @reloadWordData="loadDataWord"
        v-if="wordData"
        :word="wordData">
      </DefinitionWordPanel>

      <!-- HomeScenario -->
      <HomeScenarioWordPanel
        class="mb-3"
        @reloadWordData="loadDataWord"
        v-if="wordData"
        :word="wordData">
      </HomeScenarioWordPanel>

      <!-- Expressions -->
      <ExpressionWordPanel
        class="mb-3"
        @reloadWordData="loadDataWord"
        v-if="wordData"
        :word="wordData">
      </ExpressionWordPanel>

      <!-- Activity Data -->
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import AdminModule from "~/store/admin";
import {Word} from "~/core/types";
import {ApiManager} from "~/core/managers";
import DefinitionWordPanel from "~/components/admin/word/DefinitionWordPanel.vue";
import HomeScenarioWordPanel from "~/components/admin/word/HomeScenarioWordPanel.vue";
import ExpressionWordPanel from "~/components/admin/word/ExpressionWordPanel.vue";

@Component({
  components: {
    DefinitionWordPanel,
    HomeScenarioWordPanel,
    ExpressionWordPanel
  }
})
export default class WordPage extends Vue {
  public adminModule: AdminModule = getModule(AdminModule, this.$store)
  public wordData: Word | null = null
  public onProgress: boolean = false

  async fetch() {
    await this.loadDataWord()
  }

  async loadDataWord() {
    this.onProgress = true
    const {data} = await ApiManager.request({
      url: `/words/${this.$route.params.id}?with=expressions,definition,homeScenario,activityData`,
      method: 'GET'
    })

    this.wordData = data
    this.onProgress = false
  }

  layout() {
    return 'admin'
  }

  async mounted() {
    this.adminModule.setBasicMenu()
  }

  async getDataWord() {
    this.onProgress = true
    const {data} = await ApiManager.request({
      url: `/words/${this.$route.params.id}?with=expressions,definition,homeScenario,activityData`,
      method: 'GET'
    })
    this.wordData = data
    this.onProgress = false
  }
}
</script>

<style lang="scss" scoped>
.admin-page {
  background-color: transparent !important;
}
</style>
