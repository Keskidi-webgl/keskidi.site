<template>
  <div class="admin-page admin-page-words-list">
    <!-- Overlay -->
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>

    <!-- Header buttons -->
    <b-modal
      id="modal-create-word"
      ref="modal"
      title="Créer un mot"
      @show="resetForm"
      @hidden="resetForm"
      @ok="submitCreateWordForm"
    >
      <form ref="form" @submit.stop.prevent="submitCreateWordForm">
        <!-- Title -->
        <b-form-group
          label="Nom du mot"
          label-for="name-input"
        >
          <b-form-input
            id="name-input"
            v-model="dataFormCreate.name"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <!-- Header buttons -->
    <div class="header-panel">
      <b-button variant="success" v-b-modal.modal-create-word>Créer un mot</b-button>
    </div>

    <!-- Table medias -->
    <div>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Slug</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="word in wordsData" :key="word.id">
          <th scope="row">{{ word.id }}</th>
          <td><span @input="test(word)">{{ word.name }}</span></td>
          <td>{{ word.slug }}</td>
          <td>
            <nuxt-link :to="`words/${word.id}`">
              <button class="btn btn-primary"
              >
                <font-awesome-icon :icon="['fas', 'eye']" :style="{ color: 'white' , fontSize: '20px'}"/>
              </button>
            </nuxt-link>
            <button :disabled="onProgress"
                    @click="deleteWord(word)"
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
import AdminModule from "~/store/admin";
import {DataFormCreateWord, Word} from "~/core/types";
import {ApiManager} from "~/core/managers";
import AdminLayout from "~/layouts/admin.vue";

@Component({})
export default class WordListPage extends Vue {
  public adminModule: AdminModule = getModule(AdminModule, this.$store)
  public wordsData: Array<Word> = []
  public onProgress: boolean = false
  public dataFormCreate: DataFormCreateWord = {
    name: ''
  }

  mounted() {
    this.adminModule.setBasicMenu()
    this.syncWordData()
  }

  layout() {
    return 'admin'
  }

  resetForm() {
    this.dataFormCreate = {
      name: ''
    }
  }

  async submitCreateWordForm() {
    await this.createWord()
  }

  async syncWordData() {
    this.onProgress = true
    const {data} = await ApiManager.request({
      url: '/words',
      method: 'GET'
    })
    this.wordsData = data
    this.onProgress = false
  }

  async createWord() {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: '/words',
        method: 'POST',
        data: this.dataFormCreate
      })
      await this.syncWordData()
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

  async updateWord(word: Word) {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: `/words/${word.id}`,
        method: 'PUT',
        data: word
      })
      await this.syncWordData()
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }

    this.onProgress = false
  }

  async deleteWord(wordToDelete: Word) {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: `/words/${wordToDelete.id}`,
        method: 'DELETE',
      })
      this.wordsData = this.wordsData.filter(word => word.id !== wordToDelete.id)
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }
}
</script>

<style scoped>

</style>
