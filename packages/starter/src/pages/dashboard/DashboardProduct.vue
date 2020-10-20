<template>
  <div class="d-flex flex-grow-1 flex-column">

    <!-- loading spinner -->
    <div v-if="isLoading1" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <v-row class="flex-grow-0" dense>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <div class="display-1" v-if="selectedMachine">{{ selectedMachine.machinename }}</div>
            <v-dialog
              v-model="dialog"
              max-width="1000"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text color="primary">Add charts</v-btn>
              </template>

              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >
                  <div v-if="selectedMachine">{{ selectedMachine.machinename }}</div>
                </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox v-model="selections" label="batch size" value="1"></v-checkbox>
                      <v-checkbox v-model="selections" label="batch targets and action weights" value="2"></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox v-model="selections" label="blender capability" value="3"></v-checkbox>
                      <v-checkbox v-model="selections" label="process rate" value="4"></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-checkbox v-model="selections" label="hopper stable" value="5"></v-checkbox>
                      <v-checkbox v-model="selections" label="station conveying" value="6"></v-checkbox>
                    </v-col>
                  </v-row>

                  <div class="d-flex flex-wrap">
                    <product-details
                      v-for="selection in selections"
                      :key="selection"
                      :machine="selectMachine"
                      label="Runtime"
                      :loading="isLoading1"
                      style="width: 33.33%;"
                    >
                    </product-details>
                  </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="onMachineUpdate"
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
          </div>
        </v-col>
        <v-col
          sm="12"
          md="4"
          v-for="(selection, i) in selectedMachine.selections"
          :key="i"
        >
          <product-details
            :machine="selectedMachine"
            label="Runtime"
            :loading="isLoading1"
          >
          </product-details>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// DEMO Cards for dashboard
import ProductDetails from '../../components/dashboard/ProductDetails'

export default {
  components: {
    ProductDetails
  },
  props: {
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: false,
      dialog: false,

      selections: this.selectedMachine ? this.selectedMachine.selections : []
    }
  },
  created () {
  },
  mounted() {
    let count = 0

    this.selectMachine(this.$route.params.id)

    console.log(this.selectedMachine)
    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)

    console.log(this.selectedMachine)
  },
  beforeDestroy() {
    this.clear()
  },
  computed: {
    ...mapGetters([
      'selectedMachine'
    ]),
    propertySelections() {
      return this.selectedMachine ? this.selectedMachine.selections : []
    }
  },
  methods: {
    ...mapActions([
      'selectMachine'
    ]),
    clear() {
      clearInterval(this.loadingInterval)
    },
    onMachineUpdate() {
      this.dialog = false
    }
  }
}
</script>
