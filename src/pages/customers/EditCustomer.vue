<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Edit Company</div>
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
        <account-tab :customer-account="customerAccount"></account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab :customer-profile="customerProfile"></information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Edit Customer Page Component
| url: /customers/edit/:id
|---------------------------------------------------------------------
|
| Edit certain customer
*/
import { mapState, mapActions } from 'vuex'

import AccountTab from '../../components/customers/edit/AccountTab'
import InformationTab from '../../components/customers/edit/InformationTab'

export default {
  components: {
    AccountTab, InformationTab
  },
  data() {
    return {
      tab: null,

      breadcrumbs: [
        {
          text: 'Companies',
          to: '/customers/list',
          exact: true
        },
        {
          text: 'Edit Company'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      customerAccount: (state) => state.customers.customerAccount,
      customerProfile: (state) => state.customers.customerProfile
    })
  },
  mounted() {
    // get customer information on mounted
    this.open()
  },
  destoryed() {

  },
  methods: {
    ...mapActions({
      getCustomer: 'customers/getCustomer'
    }),
    open() {
      this.getCustomer(this.$route.params.id)
    }
  }
}
</script>
