<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="6">
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
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showTimeRangeChooser: false
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>