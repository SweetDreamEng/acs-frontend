<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>Batch and load cell zero bits</v-card-title>
    <v-card-text class="px-4">
      <v-list v-if="items.length">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content class="py-1">
            {{ item.name }}
          </v-list-item-content>

          <v-list-item-action class="my-1">
            <div class="align-center" style="width: 100px;">
              {{ item.value }}
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div v-else class="text-center">
        No Data From Device
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
