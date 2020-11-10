<template>
  <div class="w-100">
    <v-card>
      <v-card-text class="text-center">
        <v-avatar size="160">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <h2 class="my-2 primary--text">{{ username }}</h2>
        <div class="text-h6">{{ roleName(userRole) }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.auth.user.username,
      userRole: (state) => state.auth.user.role
    }),
    ...mapGetters({
      roleName: 'auth/roleName'
    })
  }
}
</script>