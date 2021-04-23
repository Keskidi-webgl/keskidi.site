<template>
  <div>
    <!-- Modal container -->
    <div v-if="word" class="expression-modal-container">

      <!-- Create expression modal -->
      <b-modal id="modal-create-expression" ref="modal" title="Créer une expression" @show="" @hidden=""
               @ok="createExpression">
        <form ref="form" @submit.stop.prevent="createExpression">
          <!-- content -->
          <b-form-group label="Contenu" label-for="content-input">
            <b-form-textarea id="content-input" v-model="createExpressionFormData.content" required></b-form-textarea>
          </b-form-group>

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
          <!-- Origin -->
          <b-form-group label="Contenu" label-for="content-input">
            <b-form-textarea id="content-input" v-model="word.expressions" required></b-form-textarea>
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
          <b-button v-if="!word.expressions" variant="success" v-b-modal.modal-create-expression>
            <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
          </b-button>
        </div>
        <!-- Content -->
        <div v-if="word.expressions" class="definition-infos-container">
          <!-- @TODO -->
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'
import {DataFormUpload, Media, Word, WordExpression} from "~/core/types"
import {MEDIA_TYPE} from "~/core/enums";
import {ApiManager} from "~/core/managers";

@Component
export default class ExpressionWordPanel extends Vue {
  @Prop({type: Object, required: true}) readonly word!: Word
  public createExpressionFormData = {
    content: '',
    file: {
      title: '',
      data: null as File | null,
    }
  }

  public updateExpressionFormData = {
    content: '',
  }

  /**
   * Call API to create Definition
   */
  async createExpression() {
    const audioData = new FormData()
    audioData.append('media', this.createExpressionFormData.file.data!, this.createExpressionFormData.file.data!.name)
    audioData.append('title', this.createExpressionFormData.file.title)
    audioData.append('description', `Audio file for expression of word ${this.word.name}`)
    audioData.append('type', MEDIA_TYPE.AUDIO)

    const {data: newAudioFile} = await ApiManager.request({
      url: '/medias',
      method: 'POST',
      data: audioData
    })

    await ApiManager.request({
      url: `/words/${this.word.id}/expressions`,
      method: 'POST',
      data: {content: this.createExpressionFormData.content, audio_id: newAudioFile.id}
    })

    this.$emit('reloadWordData')
  }

  /**
   * Call API to update Definition
   */
  async updateExpression(expression: WordExpression) {
    // @TODO
  }

  /**
   * Call API to delete Definition
   */
  async deleteExpression(expression: WordExpression) {
    // @TODO
  }
}
</script>

<style lang="scss" scoped>
</style>
