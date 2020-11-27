<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        small
        v-on="on"
      >
        <v-avatar
          color="primary"
          size="28"
        >
          <span class="white--text">{{ username | initials }}</span>
        </v-avatar>
      </v-btn>
    </template>

    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        :to="item.link"
        :exact="item.exact"
        :disabled="item.disabled"
        link
      >
        <v-list-item-icon>
          <v-icon small :class="{ 'grey--text': item.disabled }">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item @click="signOut">
        <v-list-item-icon>
          <v-icon small>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import config from '../../configs'
/*
|---------------------------------------------------------------------
| Toolbar User Component
|---------------------------------------------------------------------
|
| Quickmenu for user menu shortcuts on the toolbar
|
*/
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      menu: [
        { icon: 'mdi-account-box-outline', key: 'menu.profile', text: 'Profile', link: '/profile' }
      ]
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.auth.user.username
    })
  },
  methods: {
    ...mapActions({
      'signOut': 'auth/signOut'
    })
  }
}
</script>
