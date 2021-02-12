<template>
  <div v-if="user" class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Edit User {{ user.name && `- ${user.name}` }}</div>
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
          :roles="availableRoles"
          :locations="locations"
          :zones="zones"
          :button-loading="button_loading"
          @submit="submitAccount"
        >
        </account-tab>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <information-tab
          :user="user"
          :button-loading="button_loading"
          @submit="submitAccount"
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
      tab: null
    }
  },
  computed: {
    ...mapState({
      userRole: (state) => state.auth.user.role,
      user: (state) => state.users.user,
      button_loading: (state) => state.users.button_loading,
      roles: (state) => state.auth.roles,
      locations: (state) => state.locations.data,
      zones: (state) => state.zones.data
    }),
    breadcrumbs() {
      return [
        {
          text: 'Users',
          to: '/users',
          exact: true
        },
        {
          text: 'Edit User'
        }
      ]
    },
    isAcsUser() {
      return ['acs_admin', 'acs_manager', 'acs_viewer'].includes(this.userRole)
    },
    availableRoles() {
      if (this.isAcsUser)
        return this.roles.filter((role) => ['acs_admin', 'acs_manager', 'acs_viewer'].includes(role.key))
      else
        return this.roles.filter((role) => ['customer_admin', 'customer_manager', 'customer_operator'].includes(role.key))
    }
  },
  mounted() {
    this.openEditUser(this.$route.params.id)
    if (!this.isAcsUser) {
      this.getLocations()
      this.getZones()
    }
  },
  methods: {
    ...mapActions({
      openEditUser: 'users/openEditUser',
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
      updateUserAccount: 'users/updateUserAccount'
    }),
    submitAccount(data) {
      Object.assign(this.user, data)

      this.updateUserAccount(this.user)
    }
  }
}
</script>
