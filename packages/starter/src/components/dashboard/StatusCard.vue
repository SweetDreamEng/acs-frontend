<template>
  <v-card class="d-flex flex-column flex-grow-1">

    <div class="d-flex flex-column flex-grow-1">
      <v-card-title>
        <div>Status</div>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon class="ml-auto">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <v-row class="align-center" justify="space-around">
          <v-col cols="4" class="pa-1">
            <div class="display-2 text-right">
              6
            </div>
          </v-col>
          <v-col cols="4" class="pa-1">
            <div>
              <div class="grey--text">Outline</div>
              <div>70%</div>
            </div>
          </v-col>
        </v-row>

        <v-row class="align-center" justify="space-around">
          <v-col cols="4" class="pa-1">
            <div class="display-2 text-right">
              3
            </div>
          </v-col>
          <v-col cols="4" class="pa-1">
            <div>
              <div class="grey--text">Near Threshold</div>
              <div>30%</div>
            </div>
          </v-col>
        </v-row>

        <v-row class="align-center" justify="space-around">
          <v-col cols="4" class="pa-1">
            <div class="display-2 text-right">
              1
            </div>
          </v-col>
          <v-col cols="4" class="pa-1">
            <div>
              <div class="grey--text">outline</div>
              <div>10%</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
