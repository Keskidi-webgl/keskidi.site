<template>
  <div class="upload-page-container">
    <header>
      <h1>Liste de tous les médias</h1>
    </header>

    <div class="dashboard">
      <aside>
        <div class="form-container">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="title">Titre</label>
              <input v-model="dataFormCreate.title" type="text" class="form-control" id="title" placeholder="Titre">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="dataFormCreate.description" class="form-control" id="description" rows="3" placeholder="Description"></textarea>
            </div>
            <div class="form-group">
              <label for="media">Media</label>
              <input @change="onFileUpload" type="file" class="form-control-file" id="media">
            </div>
            <button :disabled="onProgress" type="submit" class="btn btn-success">Upload</button>
          </form>
        </div>
      </aside>

      <div class="table-container">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titre</th>
            <th scope="col">Description</th>
            <th scope="col">Date upload</th>
            <th scope="col">URL</th>
            <th scope="col">Taille</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="media in mediaData">
            <th scope="row">{{ media.id }}</th>
            <td>{{ media.title }}</td>
            <td>{{ media.description }}</td>
            <td>{{ media.uploaded_time }}</td>
            <td>{{ media.size }} kb</td>
            <td><a :href="media.url">{{ media.url }}</a></td>
            <td>
              <button :disabled="onProgress" @click="deleteMedia(media.id)" class="btn btn-danger">Supprimer</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import {ApiManager} from "~/core/managers";
import {DataFormCreate, Media} from "~/core/types";

@Component({})
export default class UploadPanel extends Vue {
  public onProgress: boolean = false
  public mediaData: Array<Media> = []
  public dataFormCreate: DataFormCreate = {
    file: null,
    title: '',
    description: ''
  }

  layout() {
    return 'admin'
  }

  async mounted() {
    ApiManager.setAxios(this.$axios)

    await this._syncMediaData()
    this.onProgress = false
  }

  onFileUpload(event: any) {
    this.dataFormCreate.file = event.target.files[0]
  }

  async onSubmit(event: any) {
    if (this.dataFormCreate.file) {
      const formData = new FormData()
      formData.append('media', this.dataFormCreate.file, this.dataFormCreate.file.name)
      formData.append('title', this.dataFormCreate.title)
      formData.append('description', this.dataFormCreate.description)

      try {
        const {data} = await ApiManager.request({
          url: '/medias/upload',
          method: 'POST',
          data: formData,
        })

        await this._syncMediaData()
        this.onProgress = false

      } catch (e) {
        this.onProgress = false
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

    } catch (e) {
      await this._syncMediaData()
      this.onProgress = false
    }
  }

  private async _syncMediaData() {
    this.onProgress = true
    const {data} = await this._getAllMedia()
    this.mediaData = data
  }

  private _getAllMedia() {
    return ApiManager.request({
      url: '/medias',
      method: 'GET'
    })
  }

}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/tables";
@import "~bootstrap/scss/buttons";
@import "~bootstrap/scss/custom-forms";
@import "~bootstrap/scss/pagination";
@import "~bootstrap/scss/forms";

.upload-page-container {
  display: flex;
  flex-direction: column;
  //height: 100vh;
  background-color: #f2f4f6;

  header {
    box-sizing: border-box;
    background-color: white;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;

    h1 {
      font-size: 25px;
    }
  }

  .dashboard {
    flex: 1;
    display: flex;
    box-sizing: border-box;
    height: calc(100vh - 60px);

    aside {
      width: 300px;
      padding: 20px 10px 0 10px;
      background-color: #2a2d3e;
      max-width: 20%;
      color: white;

      h2 {
        padding: 10px;
      }
    }

    .table-container {
      padding: 20px;
      box-sizing: border-box;
      flex: 1;
      overflow: scroll;

      table {
        background: white;
      }
    }
  }
}
</style>
