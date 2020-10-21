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

    <div class="my-2">
      <div>
        <v-card>
          <v-card-title>Basic Information</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column flex-sm-row">
              <div>
                <!-- <v-img
                  :src="user.avatar"
                  aspect-ratio="1"
                  class="blue-grey lighten-4 rounded elevation-3"
                  max-width="90"
                  max-height="90"
                ></v-img> -->
                <v-avatar
                  v-if="user.name"
                  color="primary"
                  size="68"
                >
                  <span class="white--text headline">{{ initializedName(user.name) }}</span>
                </v-avatar>
              </div>
              <div class="flex-grow-1 pt-2 pa-sm-2">
                <v-text-field v-model="user.name" label="Display name" placeholder="name"></v-text-field>
                <v-text-field v-model="user.email" label="Email" hide-details></v-text-field>

                <div class="d-flex flex-column">
                  <!-- <v-checkbox v-model="user.verified" dense label="Email Verified"></v-checkbox> -->
                  <!-- <div>
                    <v-btn
                      v-if="!user.verified"
                    >
                      <v-icon left small>mdi-email</v-icon>Send Verification Email
                    </v-btn>
                  </div> -->
                </div>

                <div class="mt-2">
                  <v-btn color="primary" @click>Save</v-btn>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// import CopyLabel from '../../components/common/CopyLabel'
// import AccountTab from './EditUser/AccountTab'
// import InformationTab from './EditUser/InformationTab'

export default {
  components: {
    // CopyLabel,
    // AccountTab,
    // InformationTab
  },
  data() {
    return {
      user: {
        'id':32,
        'email':'',
        'name':'',
        'verified':false,
        'created':'2019-08-09T03:14:12Z',
        'lastSignIn':'2019-08-14T20:00:53Z',
        'disabled':true,
        'role':'ADMIN',
        'avatar':'/images/avatars/avatar1.svg'
      },
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
  methods: {
    initializedName(username) {
      const name = 'Foo Bar 1Name too Long'
      const initials = username.match(/\b\w/g) || []

      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }
  }
}
</script>
