<template>
  <div>
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>
    <!-- Modal container -->
    <div v-if="word" class="expression-modal-container">

      <!-- Create expression modal -->
      <b-modal id="modal-create-expression" ref="modal" :title="`Créer une expression pour ${word.name}`" @show="" @hidden=""
               @ok="createExpression">
        <form ref="form" @submit.stop.prevent="createExpression">
          <!-- Content -->
          <b-form-group label="Contenu" label-for="content-input">
            <b-form-textarea id="content-input" v-model="createExpressionFormData.content" required></b-form-textarea>
          </b-form-group>

          <!-- Title file -->
          <b-form-group label="Titre de l'audio" label-for="content-input">
            <b-input id="content-input" v-model="createExpressionFormData.file.title" required></b-input>
          </b-form-group>

          <!-- File -->
          <b-form-group>
            <b-form-file
              v-model="createExpressionFormData.file.data"
              placeholder="Balance ton p.. média"
              drop-placeholder="Balance ton p.. média"
              required
            ></b-form-file>
          </b-form-group>
        </form>
      </b-modal>

      <!-- Update expression modal -->
      <b-modal v-if="word.expressions" id="modal-update-expression" ref="modal" title="Modifier l'expression" @show=""
               @hidden="" @ok="updateExpression">
        <form ref="form" @submit.stop.prevent="updateExpression">
          <!-- Content -->
          <b-form-group v-if="expressionToUpdate" label="Contenu" label-for="content-input">
            <b-form-textarea id="content-input" v-model="expressionToUpdate.content" required></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>

    </div>

    <!-- Content -->
    <div v-if="word" class="panel-container-expression">
      <!-- Infos -->
      <div class="expression-infos">
        <!-- Header -->
        <div class="expression-infos-header pb-2">
          <h2>Expressions</h2>
          <b-button v-if="" variant="success" v-b-modal.modal-create-expression>
            <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
          </b-button>
        </div>
        <!-- Content -->
        <div v-if="word.expressions" class="definition-infos-container">
          <b-card v-for="expression in word.expressions" :key="expression.id" no-body>
            <b-list-group flush>
              <b-list-group-item >
                <p class="font-weight-bold">{{ expression.content }}</p>
                <audio controls :src="expression.audio.url">
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </b-list-group-item>
            </b-list-group>

            <b-card-footer>
              <b-button @click="expressionToUpdate = expression" variant="primary" v-b-modal.modal-update-expression>
                Modifier
              </b-button>
              <b-button @click="deleteExpression(expression)" variant="danger">
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
import {Word, WordExpression} from "~/core/types"
import {MEDIA_TYPE} from "~/core/enums";
import {ApiManager} from "~/core/managers";
import AdminLayout from "~/layouts/admin.vue";

@Component
export default class ExpressionWordPanel extends Vue {
  @Prop({type: Object, required: true}) readonly word!: Word
  public onProgress: boolean = false
  public createExpressionFormData = {
    content: '',
    file: {
      title: `${this.word.name} audio expression`,
      data: null as File | null,
    }
  }

  public updateExpressionFormData = {
    content: '',
  }

  public expressionToUpdate: WordExpression|null = null

  /**
   * Call API to create Definition
   */
  async createExpression() {
    this.onProgress = true
    try {
      const audioData = new FormData()
      audioData.append('media', this.createExpressionFormData.file.data!, this.createExpressionFormData.file.data!.name)
      audioData.append('title', this.createExpressionFormData.file.title)
      audioData.append('description', `Audio file for expression of word ${this.word.name}`)
      audioData.append('type', MEDIA_TYPE.AUDIO)

      const {data: newAudioFile} = await ApiManager.request({
        url: '/medias/upload?withHashName',
        method: 'POST',
        data: audioData
      })

      const {data: createdExpression} = await ApiManager.request({
        url: `/words/${this.word.id}/expressions`,
        method: 'POST',
        data: {content: this.createExpressionFormData.content, audio_id: newAudioFile.id}
      })
      this.word.expressions.push(createdExpression)
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

  /**
   * Call API to update Definition
   */
  async updateExpression() {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: `/words/${this.word.id}/expressions/${this.expressionToUpdate!.id}`,
        method: 'PUT',
        data: {
          id: this.expressionToUpdate!.id,
          content: this.expressionToUpdate!.content,
          audio_id: this.expressionToUpdate!.audio!.id
        },
      })
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.$emit('reloadWordData')
    this.onProgress = false
  }

  /**
   * Call API to delete Definition
   */
  async deleteExpression(expressionToDeleter: WordExpression) {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: `/words/${this.word.id}/expressions/${expressionToDeleter.id}`,
        method: 'DELETE',
      })
      AdminLayout.successToast(this.$bvToast)
      this.word.expressions = this.word.expressions.filter(expression => expression.id !== expressionToDeleter.id)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }
}
</script>

<style lang="scss" scoped>
</style>
