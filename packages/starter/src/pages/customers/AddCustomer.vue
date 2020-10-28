<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Add New Customer</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">Account</v-tab>
      <v-tab to="#tabs-information">Information</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-account">
        <account-tab></account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab></information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import AccountTab from '../../components/customers/add/AccountTab'
import InformationTab from '../../components/customers/add/InformationTab'

export default {
  components: {
    AccountTab, InformationTab
  },
  data() {
    return {
      tab: null,

      breadcrumbs: [
        {
          text: 'Customers',
          to: '/customers/list',
          exact: true
        },
        {
          text: 'Add New Customer'
        }
      ]
    }
  },
  methods: {
    
  }
}
</script>
