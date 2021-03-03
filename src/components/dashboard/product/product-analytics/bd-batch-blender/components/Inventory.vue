<template>
  <div>
    <v-card
      height="100%"
      :loading="loadingInventories"
      :disabled="loadingInventories"
    >
      <v-card-title>
        Inventories
        <v-btn
          v-if="inventory.inventory_material"
          small
          class="ml-auto"
          :loading="togglingInventoryTrack"
          :disabled="togglingInventoryTrack"
          color="primary"
          @click="startClicked()"
        >
          {{ inventory.inventory_material.in_progress ? 'Stop' : 'Start' }}
        </v-btn>
        <v-btn
          icon
          small
          class="ml-1"
          @click="$emit('reload')"
        >
          <v-icon>$mdi-refresh</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div v-if="inventory.inventories && inventory.inventories.length" class="d-flex flex-wrap px-2">
          <v-row dense>
            <v-col
              v-for="(inv, i) in inventory.inventories"
              :key="i"
              cols="12"
              sm="3"
              class="py-1"
            >
              <div class="d-flex">
                <div class="subtitle-1 black--text mb-1 font-italic">{{ `Hopper ${i + 1}` }}</div>
                <v-btn
                  icon
                  class="ml-auto"
                  @click="editMaterial(i)"
                >
                  <v-icon small>$mdi-pencil</v-icon>
                </v-btn>
              </div>
              <div class=""><span class="display-1">{{ inv }}</span><span>{{ inventory.unit }}</span></div>
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
      loadingInventories: (state) => state.bdBlenderAnalytics.loadingInventories,
      togglingInventoryTrack: (state) => state.bdBlenderAnalytics.togglingInventoryTrack,
      inventory: (state) => state.bdBlenderAnalytics.inventory,
      savingMaterial: (state) => state.bdBlenderAnalytics.savingMaterial,
      materials: (state) => state.materials.data,
      locations: (state) => state.materials.materialLocations
    }),
    dialogText () {
      return `Feeder ${this.editedIndex + 1}`
    }
  },
  mounted() {
    this.getInventory({ serialNumber: this.serialNumber })
    this.getMaterials()
    this.getMaterialLocations()
  },
  methods: {
    ...mapActions({
      getMaterials: 'materials/getMaterials',
      updateInventoryMaterial: 'bdBlenderAnalytics/updateInventoryMaterial',
      getMaterialLocations: 'materials/getMaterialLocations',      
      getInventory: 'bdBlenderAnalytics/getInventory',
      toggleInventoryTracking: 'bdBlenderAnalytics/toggleInventoryTracking'
    }),

    editMaterial(item) {
      this.editedIndex = item

      switch (item) {
      case 0:
        this.editItem.material = this.inventory.inventory_material.material1_id
        this.editItem.location = this.inventory.inventory_material.location1_id
        break
      case 1:
        this.editItem.material = this.inventory.inventory_material.material2_id
        this.editItem.location = this.inventory.inventory_material.location2_id
        break
      case 2:
        this.editItem.material = this.inventory.inventory_material.material3_id
        this.editItem.location = this.inventory.inventory_material.location3_id
        break
      case 3:
        this.editItem.material = this.inventory.inventory_material.material4_id
        this.editItem.location = this.inventory.inventory_material.location4_id
        break
      case 4:
        this.editItem.material = this.inventory.inventory_material.material5_id
        this.editItem.location = this.inventory.inventory_material.location5_id
        break
      case 5:
        this.editItem.material = this.inventory.inventory_material.material6_id
        this.editItem.location = this.inventory.inventory_material.location6_id
        break
      case 6:
        this.editItem.material = this.inventory.inventory_material.material7_id
        this.editItem.location = this.inventory.inventory_material.location7_id
        break
      case 7:
        this.editItem.material = this.inventory.inventory_material.material8_id
        this.editItem.location = this.inventory.inventory_material.location8_id
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

    startClicked() {
      this.toggleInventoryTracking({
        serialNumber: this.serialNumber
      })
    },

    materialText(ind) {
      let m = null

      switch (ind) {
      case 0:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material1_id)

        return m ? m.material : 'Not Selected'
      case 1:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material2_id)

        return m ? m.material : 'Not Selected'
      case 2:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material3_id)

        return m ? m.material : 'Not Selected'
      case 3:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material4_id)

        return m ? m.material : 'Not Selected'
      case 4:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material5_id)

        return m ? m.material : 'Not Selected'
      case 5:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material6_id)

        return m ? m.material : 'Not Selected'
      case 6:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material7_id)

        return m ? m.material : 'Not Selected'
      case 7:
        m = this.materials.find((material) => material.id === this.inventory.inventory_material.material8_id)

        return m ? m.material : 'Not Selected'
      default:
        return -1
      }
    },
    locationText(ind) {
      let m = null

      switch (ind) {
      case 0:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location1_id)

        return m ? m.location : 'Not Selected'
      case 1:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location2_id)

        return m ? m.location : 'Not Selected'
      case 2:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location3_id)

        return m ? m.location : 'Not Selected'
      case 3:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location4_id)

        return m ? m.location : 'Not Selected'
      case 4:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location5_id)

        return m ? m.location : 'Not Selected'
      case 5:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location6_id)

        return m ? m.location : 'Not Selected'
      case 6:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location7_id)

        return m ? m.location : 'Not Selected'
      case 7:
        m = this.locations.find((location) => location.id === this.inventory.inventory_material.location8_id)

        return m ? m.location : 'Not Selected'
      default:
        return -1
      }
    }
  }
}
</script>
