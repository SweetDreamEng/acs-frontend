<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Thresholds</div>
        <!-- <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs> -->
      </div>
    </div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold"># <copy-label :text="item.id" /></div>
        </template>

        <template v-slot:item.date="{ item }">
          <div>{{ item.date | formatDate }}</div>
        </template>

        <template v-slot:item.companyMail="{ item }">
          <v-icon v-if="item.companyMail.status" color="green">mdi-check</v-icon>
          {{ item.companyMail.email }}
        </template>

        <template v-slot:item.sms="{ item }">
          <v-icon v-if="item.sms.status" color="green">mdi-check</v-icon>
          {{ item.sms.sms }}
        </template>

        <template v-slot:item.status="{ item }">
          <div class="font-weight-bold d-flex align-center text-no-wrap">
            <div v-if="item.status" class="warning--text">
              <v-btn
                color="success"
                @click="item.status = !item.status"
              >Enabled</v-btn>
            </div>
            <div v-else class="success--text">
              <v-btn
                color="warning"
                @click="item.status = !item.status"
              >Disabled</v-btn>
            </div>
          </div>
        </template>

        <template v-slot:item.action="{ }">
          <div class="actions">
            <v-btn icon to="/threshold/edit">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CopyLabel from '../../components/common/CopyLabel'

/*
|---------------------------------------------------------------------
| Threshold List Page
|---------------------------------------------------------------------
|
| List all thresholds
|
*/
export default {
  components: {
    CopyLabel
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
        { text: 'Id', align: 'start', value: 'id' },
        { text: 'Condition', sortable: false, value: 'condition' },
        { text: 'Email', value: 'companyMail' },
        { text: 'Date', value: 'date' },
        { text: 'SMS', value: 'sms' },
        { text: 'Status', value: 'status' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ],
      items: [
        {
          id: '2837',
          condition: 'Threshold condition name',
          companyMail: {
            email: 'johnsimon@blobhill.com',
            status: true
          },
          date: '2020-05-10',
          company: 'BlobHill',
          sms: {
            sms: '5281224377',
            status: true
          },
          status: 'true'
        },
        {
          id: '2838',
          condition: 'Threshold condition name',
          companyMail: {
            email: 'cool@caprimooner.com',
            status: false
          },
          date: '2020-05-11',
          company: 'Caprimooner',
          sms: {
            sms: '212122433',
            status: false
          },
          status: 'true'
        },
        {
          id: '2839',
          condition: 'Threshold condition name',
          companyMail: {
            email: 'bush@catloveisstilllove.com',
            status: false
          },
          date: '2020-05-11',
          company: 'CatLovers',
          sms: {
            sms: '1231224313',
            status: false
          },
          status: 'true'
        },
        {
          id: '2840',
          condition: 'Threshold condition name',
          companyMail: {
            email: 'ben@indiecoolers.com',
            status: false
          },
          date: '2020-05-12',
          company: 'IndieCoolers',
          sms: {
            sms: '987122433',
            status: true
          },
          status: 'true'
        },
        {
          id: '2841',
          condition: 'Threshold condition name',
          companyMail: {
            email: 'jack@candylooove.com',
            status: true
          },
          date: '2020-05-13',
          company: 'CandyLooove',
          sms: {
            sms: '2951224373',
            status: true
          },
          status: 'true'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
