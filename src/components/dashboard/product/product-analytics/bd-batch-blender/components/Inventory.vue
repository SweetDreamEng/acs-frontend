<template>
  <div>
    <v-card
      height="100%"
      :loading="isLoading"
      :disabled="isLoading"
    >
      <v-card-title>
        Inventories
        <v-btn
          icon
          small
          class="ml-auto"
          @click="$emit('reload')"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
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
              <div class="text-body-2">{{ materialText(i) }}</div>
              <div class="text-body-2">{{ locationText(i) }}</div>
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
    },
    serialNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      editDialog: false,
      isEditFormValid: true,

      editedIndex: -1,

      editItem: {
        material: -1,
        location: -1
      }
    }
  },
  computed: {
    ...mapState({
      savingMaterial: (state) => state.bdBlenderAnalytics.savingMaterial,
      materials: (state) => state.materials.data,
      locations: (state) => state.materials.materialLocations,
      inventoryMaterial: (state) => state.bdBlenderAnalytics.inventoryMaterial
    }),
    dialogText () {
      return `Feeder ${this.editedIndex + 1}`
    }
  },
  mounted() {
    this.getMaterials()
    this.getMaterialLocations()
  },
  methods: {
    ...mapActions({
      getMaterials: 'materials/getMaterials',
      updateInventoryMaterial: 'bdBlenderAnalytics/updateInventoryMaterial',
      getMaterialLocations: 'materials/getMaterialLocations',      
      getInventory: 'bdBlenderAnalytics/getInventory'
    }),

    editMaterial(item) {
      this.editedIndex = item

      switch (item) {
      case 0:
        this.editItem.material = this.inventoryMaterial.material1_id
        this.editItem.location = this.inventoryMaterial.location1_id
        break
      case 1:
        this.editItem.material = this.inventoryMaterial.material2_id
        this.editItem.location = this.inventoryMaterial.location2_id
        break
      case 2:
        this.editItem.material = this.inventoryMaterial.material3_id
        this.editItem.location = this.inventoryMaterial.location3_id
        break
      case 3:
        this.editItem.material = this.inventoryMaterial.material4_id
        this.editItem.location = this.inventoryMaterial.location4_id
        break
      case 4:
        this.editItem.material = this.inventoryMaterial.material5_id
        this.editItem.location = this.inventoryMaterial.location5_id
        break
      case 5:
        this.editItem.material = this.inventoryMaterial.material6_id
        this.editItem.location = this.inventoryMaterial.location6_id
        break
      case 6:
        this.editItem.material = this.inventoryMaterial.material7_id
        this.editItem.location = this.inventoryMaterial.location7_id
        break
      case 7:
        this.editItem.material = this.inventoryMaterial.material8_id
        this.editItem.location = this.inventoryMaterial.location8_id
        break
      default:
        break
      }

      this.editDialog = true
      this.$nextTick(() => {
        this.$refs.editForm.resetValidation()
      })
    },
    close () {
      this.editDialog = false
    },
    async submit () {
      if (this.$refs.editForm.validate()) {
        try {
          await this.updateInventoryMaterial({
            id: this.editedIndex,
            serialNumber: this.serialNumber,
            location: this.editItem.location,
            material: this.editItem.material
          })

          this.getInventory({ serialNumber: this.serialNumber })
          this.close()
        } catch (err) {
          console.log(err)
        }
      }
    },
    materialText(ind) {
      let m = null

      switch (ind) {
      case 0:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material1_id)

        return m ? m.material : 'Not Selected'
      case 1:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material2_id)

        return m ? m.material : 'Not Selected'
      case 2:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material3_id)

        return m ? m.material : 'Not Selected'
      case 3:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material4_id)

        return m ? m.material : 'Not Selected'
      case 4:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material5_id)

        return m ? m.material : 'Not Selected'
      case 5:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material6_id)

        return m ? m.material : 'Not Selected'
      case 6:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material7_id)

        return m ? m.material : 'Not Selected'
      case 7:
        m = this.materials.find((material) => material.id === this.inventoryMaterial.material8_id)

        return m ? m.material : 'Not Selected'
      default:
        break
      }
    },
    locationText(ind) {
      let m = null

      switch (ind) {
      case 0:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location1_id)

        return m ? m.location : 'Not Selected'
      case 1:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location2_id)

        return m ? m.location : 'Not Selected'
      case 2:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location3_id)

        return m ? m.location : 'Not Selected'
      case 3:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location4_id)

        return m ? m.location : 'Not Selected'
      case 4:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location5_id)

        return m ? m.location : 'Not Selected'
      case 5:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location6_id)

        return m ? m.location : 'Not Selected'
      case 6:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location7_id)

        return m ? m.location : 'Not Selected'
      case 7:
        m = this.locations.find((location) => location.id === this.inventoryMaterial.location8_id)

        return m ? m.location : 'Not Selected'
      default:
        break
      }
    }
  }
}
</script>
