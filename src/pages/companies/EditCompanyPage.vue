<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Edit Company</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">Account</v-tab>
      <v-tab to="#tabs-information">Information</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="overflow-visible">
      <v-tab-item value="tabs-account">
        <account-tab
          :company-account="companyAccount"
          :companies="companies"
        ></account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab :company-profile="companyProfile"></information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Edit Company Page Component
| url: /companies/edit/:id
|---------------------------------------------------------------------
|
| Edit certain company
*/
import { mapState, mapActions } from 'vuex'

import AccountTab from './EditCompany/AccountTab'
import InformationTab from './EditCompany/InformationTab'

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
          to: '/companies/list',
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
      companyAccount: (state) => state.companies.companyAccount,
      companyProfile: (state) => state.companies.companyProfile,
      companies: (state) => state.companies.companies
    })
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      getCompany: 'companies/getCompany',
      getCompanies: 'companies/getCompanies'
    }),
    open() {
      this.getCompanies()
      this.getCompany(this.$route.params.id)
    }
  }
}
</script>
