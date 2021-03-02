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
        :items="items"
        hide-default-footer
      >
        <template v-slot:item.date="{ item }">
          <div>{{ item.date | formatDate }}</div>
        </template>

        <template v-slot:item.companyMail="{ item }">
          {{ item.companyMail.email }}
        </template>

        <template v-slot:item.sms="{ item }">
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
            sms: '528-122-4377',
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
            sms: '212-122-4331',
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
            sms: '123-122-4313',
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
            sms: '987-122-4338',
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
            sms: '295-122-4373',
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
