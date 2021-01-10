<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Edit User {{ user.name && `- ${user.name}` }}</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <div class="mb-4">
      <div class="d-flex">
        <span class="font-weight-bold">Email</span>
        <span class="mx-1">
          <copy-label :text="user.email" />
        </span>
      </div>
      <div class="d-flex">
        <span class="font-weight-bold">ID</span>
        <span class="mx-1">
          <copy-label :text="user.id + ''" />
        </span>
      </div>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">Account</v-tab>
      <v-tab to="#tabs-information">Information</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-account">
        <account-tab
          :user="user"
          :roles="roles"
          :locations="locations"
          :zones="zones"
          :button_loading="button_loading"
          @submit="submitAccount"
        >
        </account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab
          :user="user"
          :button_loading="button_loading"
          @submit="submitInformation"
        >
        </information-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| User Edit Page Component
| url: /users/edit/:id
|---------------------------------------------------------------------
|
| Edit user details and manage user priviliges
*/

import CopyLabel from '../../components/common/CopyLabel'
import AccountTab from './EditUser/AccountTab'
import InformationTab from './EditUser/InformationTab'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CopyLabel,
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
          text: 'Edit User'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      button_loading: (state) => state.users.button_loading,
      roles: (state) => state.roles.data,
      locations: (state) => state.locations.data,
      zones: (state) => state.zones.data
    })
  },
  mounted() {
    this.openEditCompanyUser(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      openEditCompanyUser: 'users/openEditCompanyUser',
      updateCompanyUserAccount: 'users/updateCompanyUserAccount',
      updateCompanyUserInformation: 'users/updateCompanyUserInformation'
    }),
    submitAccount(data) {
      this.updateCompanyUserAccount(data)
    },
    submitInformation(data) {
      this.updateCompanyUserInformation(data)
    }
  }
}
</script>
