<template>
  <div class="w-100">
    <v-card>
      <v-card-text class="text-center">
        <v-avatar size="160">
           <v-avatar
            color="primary"
            size="88"
          >
            <span class="display-1 white--text">{{ username | initials }}</span>
          </v-avatar>
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