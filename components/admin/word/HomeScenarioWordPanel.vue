<template>
  <div>
    <!-- Modal container -->
    <div v-if="word" class="home-scenario-modal-container">

      <!-- Create homeScenario modal -->
      <b-modal id="modal-create-home-scenario" ref="modal" title="Créer la définition" @show="" @hidden=""
               @ok="createHomeScenario">
        <form ref="form" @submit.stop.prevent="createHomeScenario">
          <!-- Origin -->
          <b-form-group label="Contenu" label-for="content-input">
            <b-form-textarea id="content-input" v-model="createHomeScenarioDataForm.content" required></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>

      <!-- Update homeScenario modal -->
      <b-modal v-if="word.home_scenario" id="modal-update-home-scenario" ref="modal" title="Modifier la définition" @show=""
               @hidden="" @ok="updateHomeScenario">
        <form ref="form" @submit.stop.prevent="updateHomeScenario">
          <!-- Origin -->
          <b-form-group label="Contenu" label-for="content-input">
            <b-form-textarea id="content-input" v-model="word.home_scenario.content" required></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>

    </div>

    <!-- Content -->
    <div v-if="word" class="panel-container-home-scenario">
      <!-- Infos -->
      <div class="home-scenario-infos">
        <!-- Header -->
        <div class="home-scenario-infos-header pb-2">
          <h2>Scenario</h2>
          <b-button v-if="!word.home_scenario" variant="success" v-b-modal.modal-create-home-scenario>
            <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
          </b-button>
        </div>
        <!-- Content -->
        <div v-if="word.home_scenario" class="definition-infos-container">
          <b-card no-body>
            <b-list-group flush>
              <b-list-group-item>
                <h5>Contenu</h5>
                {{ word.home_scenario.content }}
              </b-list-group-item>
            </b-list-group>

            <b-card-footer>
              <b-button variant="primary" v-b-modal.modal-update-home-scenario>
                Modifier
              </b-button>
              <b-button @click="deleteHomeScenario" variant="danger">
                Supprimer
              </b-button>
            </b-card-footer>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import {Word} from "~/core/types";
import {ApiManager} from "~/core/managers";

@Component
export default class HomeScenarioWordPanel extends Vue {
  @Prop({type: Object, required: true}) readonly word!: Word
  public createHomeScenarioDataForm = {
    content: '',
  }

  /**
   * Call API to create Definition
   */
  async createHomeScenario() {
    await ApiManager.request({
      url: `/words/${this.word.id}/homeScenarios`,
      method: 'POST',
      data: this.createHomeScenarioDataForm
    })
    this.$emit('reloadWordData')
  }

  /**
   * Call API to update Definition
   */
  async updateHomeScenario() {
    await ApiManager.request({
      url: `/words/${this.word.id}/homeScenarios`,
      method: 'PUT',
      data: this.word.home_scenario
    })
    this.$emit('reloadWordData')
  }

  /**
   * Call API to delete Definition
   */
  async deleteHomeScenario() {
    await ApiManager.request({
      url: `/words/${this.word.id}/homeScenarios`,
      method: 'DELETE',
    })
    this.$emit('reloadWordData')
  }
}
</script>

<style lang="scss" scoped>
</style>
