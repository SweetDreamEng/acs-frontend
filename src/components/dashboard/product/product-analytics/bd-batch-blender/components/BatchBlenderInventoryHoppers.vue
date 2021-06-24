<template>
  <div>
    <v-card
      height="100%"
      :loading="loadingInventories"
      :disabled="loadingInventories"
    >
      <v-card-title>
        Material Used
        <v-card-title v-if="inventory.last_cleared_time" class="overline">
          Since Cleared On {{ getClearedTime(inventory.last_cleared_time) }}
        </v-card-title>
        <v-btn
          icon
          small
          class="ml-auto"
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
              md="3"
              sm="6"
              class="py-1"
            >
              <v-card>
                <div class="overline ml-2">{{ `Hopper ${i + 1}` }}</div>
                <v-card-title class="text--primary">{{ inv }} {{ inventory.unit }}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else class="text-center">
          No Data From Device
        </div>
      </v-card-text>
    </v-card>
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
    }
  },
  computed: {
    ...mapState({
      userRole: (state) => state.auth.user.role
    }),
    ...mapState('bdBlenderAnalytics', ['loadingInventories', 'inventory'])
  },
  methods: {
    ...mapActions({
      getInventory: 'bdBlenderAnalytics/getInventory'
    }),
    getClearedTime(timestamp) {
      const date = new Date(timestamp)

      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
  }
}
</script>
