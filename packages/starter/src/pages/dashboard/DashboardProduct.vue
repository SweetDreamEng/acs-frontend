<template>
  <div class="d-flex flex-grow-1 flex-column">

    <!-- loading spinner -->
    <div v-if="isLoading1 || !selectedMachine" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <v-row class="flex-grow-0" dense>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center">
            <div class="display-1">{{ selectedMachine.machinename }}</div>
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
                    <v-col xs="12" sm="6" md="4" class="py-1">
                      <v-checkbox class="mt-1" v-model="selections" label="batch size" :value="1"></v-checkbox>
                      <v-checkbox class="mt-1" v-model="selections" label="batch targets and action weights" :value="2"></v-checkbox>
                    </v-col>
                    <v-col xs="12" sm="6" md="4" class="py-1">
                      <v-checkbox class="mt-1" v-model="selections" label="blender capability" :value="3"></v-checkbox>
                      <v-checkbox class="mt-1" v-model="selections" label="process rate" :value="4"></v-checkbox>
                    </v-col>
                    <v-col xs="12" sm="6" md="4" class="py-1">
                      <v-checkbox class="mt-1" v-model="selections" label="hopper stable" :value="5"></v-checkbox>
                      <v-checkbox class="mt-1" v-model="selections" label="station conveying" :value="6"></v-checkbox>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      xs="12"
                      sm="6"
                      md="4"
                      class="py-1"
                      v-for="(selection, i) in selections"
                      :key="i"
                    >
                      <product-chart
                        :machine="selectMachine"
                        label="Runtime"
                      >
                      </product-chart>
                    </v-col>
                  </v-row>
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
          xs="12"
          sm="6"
          md="4"
          v-for="(selection, i) in selectedMachine.selections"
          :key="i"
        >
          <product-chart
            :machine="selectedMachine"
            label="Runtime"
            :loading="isLoading1"
          >
          </product-chart>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// DEMO Cards for dashboard
import ProductChart from '../../components/dashboard/ProductChart'

export default {
  components: {
    ProductChart
  },
  props: {
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: false,
      dialog: false,

      selections: []
    }
  },
  created () {
  },
  mounted() {
    let count = 0

    this.selectMachine(this.$route.params.id)

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)

    this.selections = this.selectedMachine.selections
  },
  beforeDestroy() {
    this.clear()
  },
  computed: {
    ...mapGetters([
      'selectedMachine'
    ])
  },
  methods: {
    ...mapActions([
      'selectMachine',
      'updateSelections'
    ]),
    clear() {
      clearInterval(this.loadingInterval)
    },
    onMachineUpdate() {
      this.updateSelections(this.selections)
      this.dialog = false
    }
  }
}
</script>
