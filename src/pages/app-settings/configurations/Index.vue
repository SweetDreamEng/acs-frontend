<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card>
      <v-card-title>Configurations</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="configurations"
          :loading="loadingConfigurations"
        >
          <template v-slot:item.id="{ item }">
            <div class="font-weight-bold">{{ item.id }}</div>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn icon :to="`/app-settings/configurations/${item.id}`">
              <v-icon small>$mdi-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Actions', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      loadingConfigurations: (state) => state.configurations.loadingConfigurations,
      configurations: (state) => state.configurations.configurations
    })
  },
  created() {
    this.getConfigurations()
  },
  methods: {
    ...mapActions({
      getConfigurations: 'configurations/getConfigurations'
    })
  }
}
</script>