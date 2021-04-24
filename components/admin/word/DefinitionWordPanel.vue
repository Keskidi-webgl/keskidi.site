<template>
  <div>
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>
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
      <!-- Add definition media -->
      <b-modal v-if="word.definition" id="modal-add-definition-media" ref="modal"
               title="Ajouter un média à la définition" @show=""
               @hidden="" @ok="addMediaDefinition">
        <form ref="form" @submit.stop.prevent="addMediaDefinition">
          <!-- Title media -->
          <b-form-group label="Titre" label-for="title-definition-media">
            <b-form-input id="title-definition-media" v-model="addMediaDefinitionDataForm.title"
                          required></b-form-input>
          </b-form-group>
          <!-- Media type -->
          <b-form-group label="Type" label-for="type-definition-media">
            <b-form-select id="type-definition-media" v-model="addMediaDefinitionDataForm.mediaType"
                           :options="definitionMediaType"></b-form-select>
          </b-form-group>
          <!-- Order media -->
          <b-form-group label="Ordre" label-for="order-definition-media">
            <b-form-input id="order-definition-media" v-model="addMediaDefinitionDataForm.order"
                          required></b-form-input>
          </b-form-group>
          <!-- File media -->
          <b-form-file
            v-model="addMediaDefinitionDataForm.file"
            placeholder="Chouffe le media mamène"
            drop-placeholder="Chouffe le media mamène"
            required
          ></b-form-file>
          <!-- Source media -->
          <b-form-group label="Source" label-for="source-definition-media">
            <b-form-input id="source-definition-media" v-model="addMediaDefinitionDataForm.source"
                          required></b-form-input>
          </b-form-group>
          <!-- Caption media -->
          <b-form-group label="Légende" label-for="caption-definition-media">
            <b-form-textarea id="caption-definition-media" v-model="addMediaDefinitionDataForm.caption"
                             required></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>
      <!-- Update definition media -->
      <b-modal v-if="mediaDefinitionToUpdate" id="modal-update-definition-media" ref="modal"
               title="Modifier le média" @show=""
               @hidden="" @ok="updateMediaDefinition">
        <form ref="form" @submit.stop.prevent="updateMediaDefinition">
          <!-- Title media -->
          <b-form-group label="Titre" label-for="title-definition-media">
            <b-form-input readonly id="title-definition-media" v-model="mediaDefinitionToUpdate.title"></b-form-input>
          </b-form-group>
          <!-- Order media -->
          <b-form-group label="Ordre" label-for="order-definition-media">
            <b-form-input id="order-definition-media" v-model="mediaDefinitionToUpdate.order"
                          required></b-form-input>
          </b-form-group>
          <!-- Source media -->
          <b-form-group label="Source" label-for="source-definition-media">
            <b-form-input id="source-definition-media" v-model="mediaDefinitionToUpdate.source"
                          required></b-form-input>
          </b-form-group>
          <!-- Caption media -->
          <b-form-group label="Légende" label-for="caption-definition-media">
            <b-form-textarea id="caption-definition-media" v-model="mediaDefinitionToUpdate.caption"
                             required></b-form-textarea>
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

      <!-- Media -->
      <div class="definition-media">
        <!-- Header -->
        <div class="definition-media-header pb-2">
          <h2>Medias de la définition</h2>
          <p v-if="!word.definition">Ajouter une définition avant de créer un média</p>
          <b-button v-if="word.definition" variant="success" v-b-modal.modal-add-definition-media>
            <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
          </b-button>
        </div>
        <!-- Content -->
        <div v-if="word.definition && word.definition.medias.length" class="definition-media-container">
          <b-card no-body>
            <b-tabs card>
              <b-tab :title="`Media n°${media.order} - (${media.type})`" v-for="media in word.definition.medias" :key="media.id" active>
                <b-card-text>
                  <h5>Titre</h5>
                  <p>{{ media.title }}</p>
                  <h5>Source</h5>
                  <p>{{ media.source }}</p>
                  <h5>Légende</h5>
                  <p>{{ media.caption }}</p>
                  <h5>Media</h5>
                  <a :href="media.url" target="_blank">Cliquer ici pour voir</a>
                </b-card-text>
                <div>
                  <b-button @click="mediaDefinitionToUpdate = media" variant="primary" v-b-modal.modal-update-definition-media>
                    Modifier
                  </b-button>
                  <b-button @click="deleteMediaDefinition(media)" variant="danger">
                    Supprimer
                  </b-button>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import {DefinitionMedia, Word} from "~/core/types";
import {ApiManager} from "~/core/managers";
import {MEDIA_TYPE} from "~/core/enums";
import AdminLayout from "~/layouts/admin.vue";

@Component
export default class DefinitionWordPanel extends Vue {
  @Prop({type: Object, required: true}) readonly word!: Word
  public onProgress: boolean = false
  public createDefinitionDataForm = {
    gender: '',
    phonetic: '',
    definition: '',
    origin: '',
  }

  public addMediaDefinitionDataForm = {
    title: '',
    mediaType: MEDIA_TYPE.IMAGE,
    caption: '',
    source: '',
    order: 1,
    file: null as File | null
  }

  public definitionMediaType = [
    {value: MEDIA_TYPE.IMAGE, text: MEDIA_TYPE.IMAGE},
    {value: MEDIA_TYPE.VIDEO, text: MEDIA_TYPE.VIDEO},
  ]

  public mediaDefinitionToUpdate: DefinitionMedia | null = null

  /**
   * Call API to create Definition
   */
  async createDefinition() {
    this.onProgress = true
    try {
      const {data: definitionCreated} = await ApiManager.request({
        url: `/words/${this.word.id}/definitions`,
        method: 'POST',
        data: this.createDefinitionDataForm
      })
      this.word.definition = definitionCreated
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

  /**
   * Call API to update Definition
   */
  async updateDefinition() {
    this.onProgress = true
    try {
      const {data: definitionUpdated} = await ApiManager.request({
        url: `/words/${this.word.id}/definitions`,
        method: 'PUT',
        data: this.word.definition
      })
      this.word.definition = definitionUpdated
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

  /**
   * Call API to delete Definition
   */
  async deleteDefinition() {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: `/words/${this.word.id}/definitions`,
        method: 'DELETE',
      })
      this.word.definition = null
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

  /**
   * Call API to add Media Definition
   */
  async addMediaDefinition() {
    this.onProgress = true
    try {
      const mediaData = new FormData()
      mediaData.append('media', this.addMediaDefinitionDataForm.file!, this.addMediaDefinitionDataForm.file!.name)
      mediaData.append('title', this.addMediaDefinitionDataForm.title)
      mediaData.append('description', `Media for definition of word ${this.word.name}`)
      mediaData.append('type', this.addMediaDefinitionDataForm.mediaType)

      const {data: newMediaDefinition} = await ApiManager.request({
        url: '/medias/upload',
        method: 'POST',
        data: mediaData
      })

      const {data: createdMediaDefinition} = await ApiManager.request({
        url: `/wordDefinitions/${this.word.definition!.id}/medias`,
        method: 'POST',
        data: {
          media_id: newMediaDefinition.id,
          order: this.addMediaDefinitionDataForm.order,
          source: this.addMediaDefinitionDataForm.source,
          caption: this.addMediaDefinitionDataForm.caption
        }
      })
      this.word.definition?.medias?.push(createdMediaDefinition)
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }

    this.onProgress = false
  }

  /**
   * Call API to update Media Definition
   */
  async updateMediaDefinition() {
    this.onProgress = true
    try {
      const {data: updateMediaDefinition} = await ApiManager.request({
        url: `/wordDefinitions/${this.word.definition!.id}/medias`,
        method: 'PUT',
        data: {
          media_id: this.mediaDefinitionToUpdate!.id,
          order: this.mediaDefinitionToUpdate!.order,
          source: this.mediaDefinitionToUpdate!.source,
          caption: this.mediaDefinitionToUpdate!.caption
        }
      })
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.$emit('reloadWordData')
    this.onProgress = false
  }

  /**
   * Call API to delete Media Definition
   */
  async deleteMediaDefinition(mediaToDelete: DefinitionMedia) {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: `/wordDefinitions/${this.word.definition!.id}/medias/${mediaToDelete.id}`,
        method: 'DELETE',
      })
      this.word.definition!.medias = this.word.definition!.medias!.filter(media => media.id !== mediaToDelete.id)
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

}
</script>

<style lang="scss" scoped>
.panel-container-definition {
  display: flex;
  justify-content: space-between;

  .definition-infos {
    flex: 1;
    padding-right: 50px;
  }

  .definition-media {
    flex: 1;
  }
}
</style>
