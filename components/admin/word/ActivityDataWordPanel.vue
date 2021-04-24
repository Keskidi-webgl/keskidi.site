<template>
  <div>
    <b-overlay class="absolute-overlay" opacity="1" :show="onProgress" rounded="sm"></b-overlay>
    <!-- Modal container -->
    <div v-if="word" class="activity-data-modal-container">
      <!-- Create activity data modal -->
      <b-modal id="modal-create-activity-data" ref="modal" title="Créer la définition" @show="" @hidden=""
               @ok="createActivityData">
        <form ref="form" @submit.stop.prevent="createActivityData">
          <!-- Object 1 -->
          <b-form-group label="Nom objet 1" label-for="object-one">
            <b-form-input id="object-one" v-model="createActivityDataForm.object_one" required></b-form-input>
          </b-form-group>
          <b-form-group label="Description objet 1" label-for="object-one-description">
            <b-form-input id="object-one-description" v-model="createActivityDataForm.object_one_description"
                          required></b-form-input>
          </b-form-group>
          <!-- Object 2 -->
          <b-form-group label="Nom objet 2" label-for="object-two">
            <b-form-input id="object-two" v-model="createActivityDataForm.object_two" required></b-form-input>
          </b-form-group>
          <b-form-group label="Description objet 2" label-for="object-two-description">
            <b-form-input id="object-two-description" v-model="createActivityDataForm.object_two_description"
                          required></b-form-input>
          </b-form-group>
          <!-- Object 3 -->
          <b-form-group label="Nom objet 3" label-for="object-three">
            <b-form-input id="object-three" v-model="createActivityDataForm.object_three" required></b-form-input>
          </b-form-group>
          <b-form-group label="Description objet 3" label-for="object-three-description">
            <b-form-input id="object-three-description" v-model="createActivityDataForm.object_three_description"
                          required></b-form-input>
          </b-form-group>
          <!-- Good object -->
          <b-form-group label="Nom du bon objet" label-for="good-object">
            <b-form-input id="object-three" v-model="createActivityDataForm.good_object" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>

      <!-- Update activity data modal -->
      <b-modal v-if="word.activity_data" id="modal-update-activity-data" ref="modal" title="Modifier la définition"
               @show=""
               @hidden="" @ok="updateActivityData">
        <form ref="form" @submit.stop.prevent="updateActivityData">
          <!-- Object 1 -->
          <b-form-group label="Nom objet 1" label-for="object-one">
            <b-form-input id="object-one" v-model="word.activity_data.object_one" required></b-form-input>
          </b-form-group>
          <b-form-group label="Description objet 1" label-for="object-one-description">
            <b-form-input id="object-one-description" v-model="word.activity_data.object_one_description"
                          required></b-form-input>
          </b-form-group>
          <!-- Object 2 -->
          <b-form-group label="Nom objet 2" label-for="object-two">
            <b-form-input id="object-two" v-model="word.activity_data.object_two" required></b-form-input>
          </b-form-group>
          <b-form-group label="Description objet 2" label-for="object-two-description">
            <b-form-input id="object-two-description" v-model="word.activity_data.object_two_description"
                          required></b-form-input>
          </b-form-group>
          <!-- Object 3 -->
          <b-form-group label="Nom objet 3" label-for="object-three">
            <b-form-input id="object-three" v-model="word.activity_data.object_three" required></b-form-input>
          </b-form-group>
          <b-form-group label="Description objet 3" label-for="object-three-description">
            <b-form-input id="object-three-description" v-model="word.activity_data.object_three_description"
                          required></b-form-input>
          </b-form-group>
          <!-- Good object -->
          <b-form-group label="Bon objet" label-for="good-object">
            <b-form-input id="object-three" v-model="word.activity_data.good_object" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>

    <!-- Content -->
    <div v-if="word" class="panel-container-activity-data">
      <!-- Infos -->
      <div class="activity-data-infos">
        <!-- Header -->
        <div class="activity-data-infos-header pb-2">
          <h2>Données d'activité</h2>
          <b-button v-if="!word.activity_data" variant="success" v-b-modal.modal-create-activity-data>
            <font-awesome-icon :icon="['fas', 'plus']" :style="{ color: 'white' , fontSize: '20px'}"/>
          </b-button>
        </div>
        <!-- Content -->
        <div v-if="word.activity_data" class="activity-data-infos-container">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Objet 1" active>
                <b-card-text>{{word.activity_data.object_one}}</b-card-text>
              </b-tab>
              <b-tab title="Objet 2">
                <b-card-text>{{word.activity_data.object_two}}</b-card-text>
              </b-tab>
              <b-tab title="Objet 3">
                <b-card-text>{{word.activity_data.object_three}}</b-card-text>
              </b-tab>
              <b-tab title="Bon objet">
                <b-card-text>{{word.activity_data.good_object}}</b-card-text>
              </b-tab>
            </b-tabs>
            <b-card-footer>
              <b-button variant="primary" v-b-modal.modal-update-activity-data>
                Modifier
              </b-button>
              <b-button @click="deleteActivityData" variant="danger">
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
import AdminLayout from "~/layouts/admin.vue";

@Component
export default class ActivityDataWordPanel extends Vue {
  public onProgress: boolean = false
  @Prop({type: Object, required: true}) readonly word!: Word
  public createActivityDataForm = {
    object_one: '',
    object_two: '',
    object_three: '',
    object_one_description: '',
    object_two_description: '',
    object_three_description: '',
    good_object: '',
  }

  /**
   * Call API to create Definition
   */
  async createActivityData() {
    this.onProgress = true
    try {
      const {data: createdActivityData} = await ApiManager.request({
        url: `/words/${this.word.id}/activityData`,
        method: 'POST',
        data: this.createActivityDataForm
      })
      this.word.activity_data = createdActivityData
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

  /**
   * Call API to update Definition
   */
  async updateActivityData() {
    this.onProgress = true
    try {
      const {data: updateActivityData} = await ApiManager.request({
        url: `/words/${this.word.id}/activityData`,
        method: 'PUT',
        data: this.word.activity_data
      })
      this.word.activity_data = updateActivityData
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }

    this.onProgress = false
  }

  /**
   * Call API to delete Definition
   */
  async deleteActivityData() {
    this.onProgress = true
    try {
      await ApiManager.request({
        url: `/words/${this.word.id}/activityData`,
        method: 'DELETE',
      })
      this.word.activity_data = null
      AdminLayout.successToast(this.$bvToast)
    } catch (error) {
      AdminLayout.errorToast(this.$bvToast)
    }
    this.onProgress = false
  }

}
</script>

<style lang="scss" scoped>
</style>
