<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <bar-graph
          :loading="loadingStationConveyings"
          :series="conveyingSeries"
          :categories="conveyingCategories"
        >
        </bar-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import BarGraph from '../../common/BarGraph'
export default {
  components: {
    BarGraph
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      conveyingCategories: ['Loader 1', 'Loader 2', 'Loader 3', 'Loader 4', 'Loader 5', 'Loader 6', 'Loader 7', 'Loader 8', 'Loader 9']
    }
  },
  computed: {
    ...mapState({
      loadingStationConveyings: (state) => state.bdBlenderAnalytics.loadingStationConveyings,

      stationConveyingSeries: (state) => state.bdBlenderAnalytics.stationConveyingSeries
    }),
    conveyingSeries() {
      return [{
        data: this.stationConveyingSeries
      }]
    }
  },
  created() {
    this.getStationConveyings(this.productId)
  },
  methods: {
    ...mapActions({
      getStationConveyings: 'bdBlenderAnalytics/getStationConveyings'
    })
  }
}
</script>