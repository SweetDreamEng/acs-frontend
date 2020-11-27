<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Users</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/acs-admin/users/add">
        Create User
      </v-btn>
    </div>

    <v-card>
      <!-- users list -->
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedUsers.length > 0" v-on="on">
                  Actions
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </transition>
            </template>
            <v-list dense>
              <v-list-item @click>
                <v-list-item-title>Disable</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-col>
        <v-col cols="6" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="e.g. filter for id, email, name, etc"
            @keyup.enter="searchUser(searchQuery)"
          ></v-text-field>
          <v-btn
            :loading="isBtnLoading"
            icon
            small
            class="ml-2"
            @click="initAcsUsers"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        v-model="selectedUsers"
        show-select
        :headers="headers"
        :items="users"
        :search="searchQuery"
        class="flex-grow-1"
        :loading="isUsersTableLoading"
      >
        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold"># <copy-label :text="item.id + ''" /></div>
        </template>

        <template v-slot:item.email="{ item }">
          <div class="d-flex align-center py-1">
            <v-avatar
              color="primary"
              size="28"
            >
              <span class="white--text">{{ item.name | initials }}</span>
            </v-avatar>
            <span class="ml-1">{{ item.email }}</span>
          </div>
        </template>

        <template v-slot:item.role="{ item }">
          <v-chip
            label
            small
            class="font-weight-bold"
            dark
            :color="roleColor(item.role)"
          >{{ item.role.name | capitalize }}</v-chip>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div>{{ item.created_at | formatDate('ll') }}</div>
        </template>

        <template v-slot:item.action="{ item }">
          <div class="actions">
            <v-btn icon :to="'/acs-admin/users/edit/' + item.id">
              <v-icon small>mdi-pencil</v-icon>
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
| User Access Page Component
| url: /users/list
|---------------------------------------------------------------------
|
| List all users and give create/edit user options
*/

import CopyLabel from '../../components/common/CopyLabel'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CopyLabel
  },
  data() {
    return {
      breadcrumbs: [{
        text: 'Users',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Role', value: 'role' },
        { text: 'Created', value: 'created_at' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users.data,
      isUsersTableLoading: (state) => state.users.isUsersTableLoading,
      isBtnLoading: (state) => state.users.isBtnLoading
    })
  },
  mounted() {
    this.initAcsUsers()
  },
  methods: {
    ...mapActions({
      initAcsUsers: 'users/initAcsUsers'
    }),
    searchUser() {},
    roleColor(role) {
      if (role.key === 'acs_manager') return '#4CAF50'
      else if (role.key === 'acs_viewer') return '#F79803'
      else return undefined
    }
  }
}
</script>