<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Add New User</div>
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
        <account-tab
          :roles="roles"
          :locations="locations"
          :zones="zones"
          :button_loading="button_loading"
          @submit="submit"
        >
        </account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab
        >
        </information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| User Create Page Component
| url: /users/add
|---------------------------------------------------------------------
|
| Create a new user
*/

import AccountTab from './AddUser/AccountTab'
import InformationTab from './AddUser/InformationTab'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AccountTab,
    InformationTab
  },
  data() {
    return {
      tab: null,
      breadcrumbs: [
        {
          text: 'Users',
          to: '/users/list',
          exact: true
        },
        {
          text: 'Add New User'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      button_loading: (state) => state.users.button_loading,
      roles: (state) => state.roles.data,
      locations: (state) => state.locations.data,
      zones: (state) => state.zones.data
    })
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      open: 'users/openCreateAccount',
      addCompanyUser: 'users/addCompanyUser'
    }),
    submit(data) {
      this.addCompanyUser(data)
    }
  }
}
</script>
