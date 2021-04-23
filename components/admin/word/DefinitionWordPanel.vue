<template>
  <div>
    <!-- Modal container -->
    <div v-if="word" class="definition-modal-container">
      <!-- Create definition modal -->
      <b-modal id="modal-create-definition" ref="modal" title="Créer la définition" @show="" @hidden=""
               @ok="createDefinition">
        <form ref="form" @submit.stop.prevent="createDefinition">
          <!-- Gender -->
          <b-form-group label="Genre" label-for="gender-input">
            <b-form-input id="gender-input" v-model="createDefinitionDataForm.gender" required></b-form-input>
          </b-form-group>
          <!-- Phonetic -->
          <b-form-group label="Phonétique" label-for="phonetic-input">
            <b-form-input id="phonetic-input" v-model="createDefinitionDataForm.phonetic" required></b-form-input>
          </b-form-group>
          <!-- Definition -->
          <b-form-group label="Définition" label-for="definition-input">
            <b-form-input id="definition-input" v-model="createDefinitionDataForm.definition"
                          required></b-form-input>
          </b-form-group>
          <!-- Origin -->
          <b-form-group label="Origine" label-for="Origin-input">
            <b-form-textarea id="Origin-input" v-model="createDefinitionDataForm.origin" required></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>
      <!-- Update definition modal -->
      <b-modal v-if="word.definition" id="modal-update-definition" ref="modal" title="Modifier la définition" @show=""
               @hidden="" @ok="updateDefinition">
        <form ref="form" @submit.stop.prevent="updateDefinition">
          <!-- Gender -->
          <b-form-group label="Genre" label-for="gender-input">
            <b-form-input id="gender-input" v-model="word.definition.gender" required></b-form-input>
          </b-form-group>
          <!-- Phonetic -->
          <b-form-group label="Phonétique" label-for="phonetic-input">
            <b-form-input id="phonetic-input" v-model="word.definition.phonetic" required></b-form-input>
          </b-form-group>
          <!-- Definition -->
          <b-form-group label="Définition" label-for="definition-input">
            <b-form-input id="definition-input" v-model="word.definition.definition" required></b-form-input>
          </b-form-group>
          <!-- Origin -->
          <b-form-group label="Origine" label-for="Origin-input">
            <b-form-textarea id="Origin-input" v-model="word.definition.origin" required></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>

    </div>

    <!-- Content -->
    <div v-if="word" class="panel-container-definition">
      <!-- Infos -->
      <div class="definition-infos">
        <!-- Header -->
        <div class="definition-infos-header pb-2">
          <h2>Definition</h2>
          <b-button v-if="!word.definition" variant="success" v-b-modal.modal-create-definition>
            <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
          </b-button>
        </div>
        <!-- Content -->
        <div v-if="word.definition" class="definition-infos-container">
          <b-card no-body>
            <b-list-group flush>
              <b-list-group-item>
                <h5>Genre</h5>
                {{ word.definition.gender }}
              </b-list-group-item>
              <b-list-group-item>
                <h5>Phonétique</h5>
                {{ word.definition.phonetic }}
              </b-list-group-item>
              <b-list-group-item>
                <h5>Courte définition</h5>
                {{ word.definition.definition }}
              </b-list-group-item>
              <b-list-group-item>
                <h5>Origine</h5>
                {{ word.definition.origin }}
              </b-list-group-item>
            </b-list-group>

            <b-card-footer>
              <b-button variant="primary" v-b-modal.modal-update-definition>
                Modifier
              </b-button>
              <b-button @click="deleteDefinition" variant="danger">
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
export default class DefinitionWordPanel extends Vue {
  @Prop({type: Object, required: true}) readonly word!: Word
  public createDefinitionDataForm = {
    gender: '',
    phonetic: '',
    definition: '',
    origin: '',
  }

  public addMediaDefinitionDataForm = {}

  /**
   * Call API to create Definition
   */
  async createDefinition() {
    await ApiManager.request({
      url: `/words/${this.word.id}/definitions`,
      method: 'POST',
      data: this.createDefinitionDataForm
    })
    this.$emit('reloadWordData')
  }

  /**
   * Call API to update Definition
   */
  async updateDefinition() {
    await ApiManager.request({
      url: `/words/${this.word.id}/definitions`,
      method: 'PUT',
      data: this.word.definition
    })
    this.$emit('reloadWordData')
  }

  /**
   * Call API to delete Definition
   */
  async deleteDefinition() {
    await ApiManager.request({
      url: `/words/${this.word.id}/definitions`,
      method: 'DELETE',
    })
    this.$emit('reloadWordData')
  }

  /**
   * Call API to add Media Definition
   */
  addMediaDefinition() {
    // @TODO
  }

  /**
   * Call API to update Media Definition
   */
  updateMediaDefinition() {
    // @TODO
  }

  /**
   * Call API to delete Media Definition
   */
  deleteMediaDefinition() {
    // @TODO
  }

}
</script>

<style lang="scss" scoped>
</style>
