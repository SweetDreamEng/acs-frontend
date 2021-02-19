<template>
  <div>
    <v-card
      height="100%"
      :loading="isLoading"
      :disabled="isLoading"
    >
      <v-card-title>
        Inventories
      </v-card-title>
      <v-card-text>
        <div v-if="inventories.length" class="d-flex flex-wrap px-2">
          <v-row dense>
            <v-col
              v-for="(inventory, i) in inventories"
              :key="i"
              cols="12"
              sm="3"
              class="py-1"
            >
              <div class="d-flex">
                <div class="text-h5 black--text" v-text="inventory"></div>
                <v-btn
                  icon
                  class="ml-auto"
                  @click="editMaterial(i)"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </div>
              <div class="text-body-2" v-text="'Material ' + (i + 1)"></div>
              <div class="text-body-2" v-text="'Location ' + (i + 1)"></div>
            </v-col>
          </v-row>
        </div>
        <div v-else class="text-center">
          No Data From Device
        </div>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="editDialog"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title class="primary white--text">{{ dialogText }}</v-card-title>
        <v-card-text class="mt-2">
          <v-form ref="editForm" v-model="isEditFormValid" lazy-validation @submit.prevent="submit">
            <v-select
              v-model="editItem.material"
              :items="materials"
              placeholder="Material"
              item-value="id"
              item-text="material"
              :rules="[$rules.required]"
              outlined
              dense
            >
            </v-select>

            <v-select
              v-model="editItem.location"
              :items="locations"
              placeholder="Location"
              item-value="id"
              item-text="location"
              :rules="[$rules.required]"
              outlined
              dense
            >
            </v-select>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                :disabled="savingMaterial"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :loading="savingMaterial"
                :disabled="savingMaterial"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    inventories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editDialog: false,
      isEditFormValid: true,

      editItem: {
        material: '',
        location: ''
      }
    }
  },
  computed: {
    ...mapState({
      savingMaterial: (state) => state.materials.savingMaterial,
      materials: (state) => state.materials.data,
      locations: (state) => state.materials.materialLocations
    }),
    dialogText () {
      return 'Feeder 1'
    }
  },
  mounted() {
    this.getMaterials()
    this.getMaterialLocations()
  },
  methods: {
    ...mapActions({
      getMaterials: 'materials/getMaterials',
      getMaterialLocations: 'materials/getMaterialLocations'
    }),

    editMaterial(item) {
      console.log(item)
      // this.editedIndex = this.materials.indexOf(item)
      // this.editItem = Object.assign({}, item)
      this.editDialog = true
      // this.$nextTick(() => {
      //   this.$refs.editForm.resetValidation()
      // })
    },
    close () {
      this.editDialog = false
    },
    submit () {

    }
  }
}
</script>
