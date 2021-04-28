<template>
  <div class="admin-page admin-page-upload">
    <!-- Overlay -->
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>

    <!-- Modal upload -->
    <b-modal
      id="modal-upload-media"
      ref="modal"
      title="Upload un GLTF"
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
        <!-- File -->
        <b-form-file
          v-model="dataFormUpload.file"
          placeholder="Aboule le GLTF narvalo"
          drop-placeholder="Aboule le GLTF narvalo"
          required
        ></b-form-file>
      </form>
    </b-modal>

    <!-- Header buttons -->
    <div class="header-panel">
      <b-button variant="success" v-b-modal.modal-upload-media>Upload un GLTF</b-button>
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
        <tr v-for="gltf in gltfData" :key="gltf.id">
          <th scope="row">{{ gltf.id }}</th>
          <td>{{ gltf.title }}</td>
          <td>{{ gltf.description }}</td>
          <td>{{ gltf.uploaded_time }}</td>
          <td>{{ gltf.size }} kb</td>
          <td><a :href="gltf.url">{{ gltf.url }}</a></td>
          <td>
            <button :disabled="onProgress"
                    @click="deleteGltf(gltf.id)"
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
import AdminStore from "~/store/admin";
import {MEDIA_TYPE} from "~/core/enums";
import AdminLayout from "~/layouts/admin.vue";

@Component({})
export default class GltfPanel extends Vue {
  public adminStore: AdminStore = getModule(AdminStore, this.$store)
  public onProgress: boolean = false
  public gltfData: Array<Media> = []
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
    this.adminStore.setBasicMenu()
    await this._syncGltfData()
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
      formData.append('type', MEDIA_TYPE.GLTF)

      try {
        const {data} = await ApiManager.request({
          url: '/medias/upload',
          method: 'POST',
          data: formData,
        })

        await this._syncGltfData()
        this.onProgress = false
        this.$bvModal.hide('modal-upload-media')
        AdminLayout.successToast(this.$bvToast)
      } catch (e) {
        this.onProgress = false
        this.$bvModal.hide('modal-upload-media')
        AdminLayout.errorToast(this.$bvToast)
      }
    }
  }

  async deleteGltf(gltfId: number) {
    try {
      const {data} = await ApiManager.request({
        url: `/medias/${gltfId}`,
        method: 'DELETE',
      })
      AdminLayout.successToast(this.$bvToast)
    } catch (e) {
      AdminLayout.errorToast(this.$bvToast)
    }

    await this._syncGltfData()
    this.onProgress = false
  }

  resetForm() {
    this.dataFormUpload = {
      file: null,
      title: '',
      description: '',
      type: MEDIA_TYPE.VIDEO
    }
  }

  private async _syncGltfData() {
    this.onProgress = true
    const {data} = await this._getAllMedia()
    this.gltfData = data
    this.onProgress = false
  }

  private _getAllMedia() {
    return ApiManager.request({
      url: '/medias?type=gltf',
      method: 'GET'
    })
  }


}
</script>

<style scoped lang="scss">
.admin-page-upload {
}
</style>
