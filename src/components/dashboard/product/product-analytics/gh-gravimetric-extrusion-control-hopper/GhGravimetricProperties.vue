<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    lineSeries(name, values) {
      return [{
        name: name,
        data: values
      }]
    }
  }
}
</script>