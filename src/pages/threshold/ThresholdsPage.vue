<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Thresholds</div>
        <!-- <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs> -->
      </div>
    </div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="thresholds"
        :loading="loading"
        hide-default-footer
      >
        <template v-slot:item.condition="{ item }">
          {{ item.option }}
        </template>

        <template v-slot:item.date="{ item }">
          <div>{{ item.updated_at.split('T')[0] }}</div>
        </template>

        <template v-slot:item.companyMail="{ item }">
          {{ item.email }}
        </template>

        <template v-slot:item.sms="{ item }">
          {{ item.sms }}
        </template>

        <template v-slot:item.status="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <div class="warning--text">
              <v-btn
                :color="item.status ? 'success' : 'warning'"
                :loading="buttonLoading"
                @click="handleChangeStatus(item.id)"
              >{{ item.status ? 'Enabled' : 'Disabled' }}</v-btn>
            </div>
          </div>
        </template>

        <template v-slot:item.action="{ }">
          <div class="actions">
            <v-btn icon to="/threshold/edit">
              <v-icon small>$mdi-pencil</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>

/*
|---------------------------------------------------------------------
| Threshold List Page Component
| url: /threshold/list
|---------------------------------------------------------------------
|
| List thresholds
*/
import { mapActions, mapState } from 'vuex'

export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        { text: 'Condition', sortable: false, value: 'condition' },
        { text: 'Email', value: 'companyMail' },
        { text: 'Date', value: 'date' },
        { text: 'SMS', value: 'sms' },
        { text: 'Status', value: 'status' },
        { text: '', sortable: false, align: 'center', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.thresholds.loading,
      thresholds: (state) => state.thresholds.thresholds,
      buttonLoading: (state) => state.thresholds.buttonLoading
    })
  },
  mounted() {
    this.getThresholds()
  },
  methods: {
    ...mapActions({
      getThresholds: 'thresholds/getThresholds',
      changeThresholdStatus: 'thresholds/changeThresholdStatus'
    }),
    async handleChangeStatus(id) {
      try {
        await this.changeThresholdStatus(id)
      } catch (error) {
        console.log(error)
      }
      this.getThresholds()
    }
  }
}
</script>
