<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>Online Hours</v-card-title>
    <v-card-text class="px-2">
      <v-list>
        <v-list-item :key="10">
          <v-list-item-content>
          </v-list-item-content>
          <v-list-item-action>
            <div class="d-flex align-center">
              <div style="width: 100px;">Total</div>
              <div style="width: 100px;">Maint</div>
            </div>
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="(hour, i) in hours" :key="i">
          <v-list-item-content>
            {{ hour.name }}
          </v-list-item-content>

          <v-list-item-action>
            <div class="d-flex align-center">
              <div style="width: 100px;"><span class="font-weight-bold">{{ hour.total_value }}</span> <span>h</span></div>
              <div style="width: 100px;"><span class="font-weight-bold">{{ hour.maint_value }}</span> <span>h</span></div>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
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
    hours: {
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
