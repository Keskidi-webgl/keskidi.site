<template>
  <div class="admin-page">
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>
    <!-- Create definition modal -->
    <b-modal id="modal-create-definition" ref="modal" title="Créer la définition" @show="" @hidden="" @ok="createDefinition">
      <form ref="form" @submit.stop.prevent="createDefinition">
        <!-- Gender -->
        <b-form-group label="Genre" label-for="gender-input">
          <b-form-input id="gender-input" v-model="dataForm.addMediaDefinition.gender" required></b-form-input>
        </b-form-group>
        <!-- Phonetic -->
        <b-form-group label="Phonétique" label-for="phonetic-input">
          <b-form-input id="phonetic-input" v-model="dataForm.addMediaDefinition.phonetic" required></b-form-input>
        </b-form-group>
        <!-- Definition -->
        <b-form-group label="Définition" label-for="definition-input">
          <b-form-input id="definition-input" v-model="dataForm.addMediaDefinition.definition" required></b-form-input>
        </b-form-group>
        <!-- Origin -->
        <b-form-group label="Origine" label-for="Origin-input">
          <b-form-textarea id="Origin-input" v-model="dataForm.addMediaDefinition.origin" required></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
    <!-- Update definition modal -->
    <b-modal v-if="wordData.definition" id="modal-update-definition" ref="modal" title="Modifier la définition" @show="" @hidden="" @ok="updateDefinition">
      <form ref="form" @submit.stop.prevent="updateDefinition">
        <!-- Gender -->
        <b-form-group label="Genre" label-for="gender-input">
          <b-form-input id="gender-input" v-model="wordData.definition.gender" required></b-form-input>
        </b-form-group>
        <!-- Phonetic -->
        <b-form-group label="Phonétique" label-for="phonetic-input">
          <b-form-input id="phonetic-input" v-model="wordData.definition.phonetic" required></b-form-input>
        </b-form-group>
        <!-- Definition -->
        <b-form-group label="Définition" label-for="definition-input">
          <b-form-input id="definition-input" v-model="wordData.definition.definition" required></b-form-input>
        </b-form-group>
        <!-- Origin -->
        <b-form-group label="Origine" label-for="Origin-input">
          <b-form-textarea id="Origin-input" v-model="wordData.definition.origin" required></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>

    <!-- Header panel -->
    <div class="header-panel">
      <h1>{{ wordData.name.toUpperCase() }}</h1>
    </div>

    <div class="panel-container">
      <!-- Definitions -->
      <div class="panel-container-definition">
        <!-- Infos -->
        <div class="definition-infos">
          <div class="definition-infos-header pb-2">
            <h2>Definition</h2>
            <b-button v-if="!wordData.definition" variant="success" v-b-modal.modal-create-definition>
              <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
            </b-button>
          </div>
          <div v-if="wordData.definition" class="definition-infos-container">
            <b-card no-body>
              <b-list-group flush>
                <b-list-group-item>
                  <h5>Genre</h5>
                  {{wordData.definition.gender}}
                </b-list-group-item>
                <b-list-group-item>
                  <h5>Phonétique</h5>
                  {{wordData.definition.phonetic}}
                </b-list-group-item>
                <b-list-group-item>
                  <h5>Courte définition</h5>
                  {{wordData.definition.definition}}
                </b-list-group-item>
                <b-list-group-item>
                  <h5>Origine</h5>
                  {{wordData.definition.origin}}
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
        <!-- Medias -->
        <div class="definition-medias">
          <div class="definition-media-header pb-2">
            <h2>Medias</h2>
            <b-button v-if="!wordData.definition" variant="success" v-b-modal.modal-create-definition>
              <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
            </b-button>
          </div>
          <div class="definition-infos-container">
            <form ref="form" @@submit.stop.prevent="addMediaToDefinition">
              <!-- Title -->
              <b-form-group
                label="Titre"
                label-for="name-input"
              >
                <b-form-input
                  id="name-input"
                  v-model="dataForm.addMediaDefinition.title"
                  required
                ></b-form-input>
              </b-form-group>
              <!-- Description -->
              <b-form-group
                label="Description"
                label-for="name-input"
              >
                <b-form-textarea
                  id="name-input"
                  v-model="dataForm.addMediaDefinition.description"
                  required
                ></b-form-textarea>
              </b-form-group>
              <b-form-group>
                <b-form-select v-model="dataForm.addMediaDefinition.type" :options="mediaDefinitionTypes"></b-form-select>
              </b-form-group>
              <!-- File -->
              <b-form-group>
                <b-form-file
                  v-model="dataForm.addMediaDefinition.file"
                  placeholder="Ajouter un media"
                  drop-placeholder="Ajouter un media"
                  required
                ></b-form-file>
              </b-form-group>

              <b-button variant="success" type="submit">Ajouter le média</b-button>
            </form>
          </div>
        </div>
      </div>

      <!-- Expressions -->

      <!-- HomeScenario -->

      <!-- Activity Data -->
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import AdminModule from "~/store/admin";
import {Word} from "~/core/types";
import {ApiManager} from "~/core/managers";
import {Context} from "@nuxt/types";
import {MEDIA_TYPE} from "~/core/enums";

@Component({})
export default class WordPage extends Vue {
  public adminModule: AdminModule = getModule(AdminModule, this.$store)
  public wordData!: Word
  public dataForm = this.getDefaultDataForm()
  public mediaDefinitionTypes = [
    {value: MEDIA_TYPE.AUDIO, text: MEDIA_TYPE.AUDIO},
    {value: MEDIA_TYPE.VIDEO, text: MEDIA_TYPE.VIDEO},
  ]

  public onProgress: boolean = false

  async asyncData(ctx: Context) {
    const {data: wordData} =  await ApiManager.request({
      url: `/words/${ctx.params.id}?with=expressions,definition,homeScenario,activityData`,
      method: 'GET'
    })
    return {
      wordData
    }
  }

  layout() {
    return 'admin'
  }

  async mounted() {
    this.adminModule.setBasicMenu()
  }

  async syncWordData() {
    this.onProgress = true
    const {data} = await ApiManager.request({
      url: `/words/${this.$route.params.id}?with=expressions,definition,homeScenario,activityData`,
      method: 'GET'
    })
    this.wordData = data
    this.onProgress = false
  }

  async createDefinition() {
    this.onProgress = true
    await ApiManager.request({
      url: `/words/${this.wordData.id}/definitions`,
      method: 'POST',
      data: this.dataForm.addMediaDefinition
    })
    await this.syncWordData()
    this.onProgress = false
  }

  async updateDefinition() {
    this.onProgress = true
    await ApiManager.request({
      url: `/words/${this.wordData.id}/definitions`,
      method: 'PUT',
      data: this.wordData.definition
    })
    await this.syncWordData()
    this.onProgress = false
  }

  async deleteDefinition() {
    this.onProgress = true
    await ApiManager.request({
      url: `/words/${this.wordData.id}/definitions`,
      method: 'DELETE',
    })
    await this.syncWordData()
    this.onProgress = false
  }

  async addMediaToDefinition() {
    console.log('add media to definition !')
  }

  getDefaultDataForm() {
    return {
      createDefinition: {
        gender: '',
        definition: '',
        origin: '',
        phonetic: '',
      },
      addMediaDefinition: {
        title: '',
        description: '',
        type: MEDIA_TYPE.IMAGE,
        file: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-page {
  background-color: transparent !important;

  .panel-container-definition {
    display: flex;
    padding: 30px;
    background-color: white;
  }
  .definition-infos {
    flex: 1;
    box-sizing: border-box;
    padding-right: 60px;
  }

  .definition-medias {
    flex: 1;
  }
}
</style>
