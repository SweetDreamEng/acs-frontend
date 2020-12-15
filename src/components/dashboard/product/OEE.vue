<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title>
      Hop & Fractual Inventories
    </v-card-title>
    <v-card-text>
      <div v-if="inventories.length" class="d-flex flex-wrap px-2">
        <div
          v-for="(inventory, i) in inventories"
          :key="i"
          class="py-1"
          style="width: 25%"
        >
          <div class="text-h5 black--text" v-text="inventory"></div>
          <div class="body-1" v-text="'Feader ' + (i + 1)"></div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  components: {
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      inventories: (state) => state.machines.inventories
    })
  },
  methods: {
  }
}
</script>
