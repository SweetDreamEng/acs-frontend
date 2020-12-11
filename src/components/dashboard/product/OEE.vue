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
      <div v-if="inventories.length">
        <div
          v-for="(inventory, i) in inventories"
          :key="i"
          class="d-flex align-center py-1"
        >
          <div class="subtitle-1 text-right" style="width: 50%;">Feader {{ i }} :</div>
          <div class="ml-1" style="width: 50%;">{{ inventory }}</div>
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
