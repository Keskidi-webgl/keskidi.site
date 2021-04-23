<template>
  <div class="admin-page admin-page-upload">
    <!-- Overlay -->
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>

    <!-- Modal upload -->
    <b-modal
      id="modal-upload-media"
      ref="modal"
      title="Upload un média"
      @show="resetForm"
      @hidden="resetForm"
      @ok="submitForm"
    >
      <form ref="form" @@submit.stop.prevent="submitForm">
        <!-- Title -->
        <b-form-group
          label="Titre"
          label-for="name-input"
        >
          <b-form-input
            id="name-input"
            v-model="dataFormUpload.title"
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
            v-model="dataFormUpload.description"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group>
          <b-form-select v-model="dataFormUpload.type" :options="typeOption"></b-form-select>
        </b-form-group>
        <!-- File -->
        <b-form-file
          v-model="dataFormUpload.file"
          placeholder="Aboule le media narvalo"
          drop-placeholder="Aboule le media narvalo"
          required
        ></b-form-file>
      </form>
    </b-modal>

    <!-- Header buttons -->
    <div class="header-panel">
      <b-button variant="success" v-b-modal.modal-upload-media>Upload un média</b-button>

      <b-form-radio-group
        id="btn-radios-1"
        v-model="filters.type.selected"
        :options="filters.type.options"
        name="radios-btn-default"
        buttons
      ></b-form-radio-group>
    </div>

    <!-- Table medias -->
    <div>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Description</th>
          <th scope="col">Date upload</th>
          <th scope="col">Taille</th>
          <th scope="col">URL</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="media in filteredMediaData()">
          <th scope="row">{{ media.id }}</th>
          <td>{{ media.title }}</td>
          <td>{{ media.description }}</td>
          <td>{{ media.uploaded_time }}</td>
          <td>{{ media.size }} kb</td>
          <td><a :href="media.url">{{ media.url }}</a></td>
          <td>
            <button :disabled="onProgress"
                    @click="deleteMedia(media.id)"
                    class="btn btn-danger"
            >
              <font-awesome-icon :icon="['fas', 'trash']" :style="{ color: 'white' , fontSize: '20px'}"/>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import {ApiManager} from "~/core/managers";
import {DataFormUpload, Media} from "~/core/types";
import AdminModule from "~/store/admin";
import {MEDIA_TYPE} from "~/core/enums";
import AdminLayout from "~/layouts/admin.vue";

@Component({})
export default class UploadPanel extends Vue {
  public adminModule: AdminModule = getModule(AdminModule, this.$store)
  public onProgress: boolean = false
  public mediaData: Array<Media> = []
  public dataFormUpload: DataFormUpload = {
    file: null,
    title: '',
    description: '',
    type: '*'
  }
  public typeOption = [
    {value: MEDIA_TYPE.AUDIO, text: MEDIA_TYPE.AUDIO},
    {value: MEDIA_TYPE.VIDEO, text: MEDIA_TYPE.VIDEO},
    {value: MEDIA_TYPE.GLTF, text: MEDIA_TYPE.GLTF},
    {value: MEDIA_TYPE.IMAGE, text: MEDIA_TYPE.IMAGE},
  ]
  public filters = {
    type: {
      options: [{value: '*', text: 'Tout'}, ...this.typeOption],
      selected: '*'
    }
  }

  async mounted() {
    this.adminModule.setBasicMenu()
    await this._syncMediaData()
  }

  public filteredMediaData() {
    return this.mediaData.filter(media => {
      return this.filters.type.selected === '*' || (media.type === this.filters.type.selected)
    })
  }

  layout() {
    return 'admin'
  }

  async submitForm(event: any) {
    if (event) {
      event.preventDefault()
    }
    if (this.dataFormUpload.file) {
      const formData = new FormData()
      formData.append('media', this.dataFormUpload.file, this.dataFormUpload.file.name)
      formData.append('title', this.dataFormUpload.title)
      formData.append('description', this.dataFormUpload.description)
      formData.append('type', this.dataFormUpload.type)

      try {
        const {data} = await ApiManager.request({
          url: '/medias/upload',
          method: 'POST',
          data: formData,
        })

        await this._syncMediaData()
        this.onProgress = false
        this.$bvModal.hide('modal-upload-media')
        AdminLayout.successToast('Media upload avec succès', this.$bvToast)
      } catch (e) {
        this.onProgress = false
        this.$bvModal.hide('modal-upload-media')
        AdminLayout.errorToast('Une erreur s\'est produite pendant l\'upload du media ', this.$bvToast)
      }
    }
  }

  async deleteMedia(mediaId: number) {
    try {
      const {data} = await ApiManager.request({
        url: `/medias/${mediaId}`,
        method: 'DELETE',
      })

      await this._syncMediaData()
      this.onProgress = false
      AdminLayout.successToast('Media supprimé avec succès', this.$bvToast)
    } catch (e) {
      await this._syncMediaData()
      this.onProgress = false
      AdminLayout.errorToast('Problème lors de la suppression du média', this.$bvToast)
    }
  }

  resetForm() {
    this.dataFormUpload = {
      file: null,
      title: '',
      description: '',
      type: MEDIA_TYPE.VIDEO
    }
  }

  private async _syncMediaData() {
    this.onProgress = true
    const {data} = await this._getAllMedia()
    this.mediaData = data
    this.onProgress = false
  }

  private _getAllMedia() {
    return ApiManager.request({
      url: '/medias',
      method: 'GET'
    })
  }


}
</script>

<style scoped lang="scss">
.admin-page-upload {
}
</style>
