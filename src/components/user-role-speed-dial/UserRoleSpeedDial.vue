<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    direction="top"
    :transition="transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        :loading="buttonLoading"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon v-if="fab">
          $mdi-close
        </v-icon>
        <v-icon v-else>
          $mdi-account-circle
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="orange"
      @click="handleUserRole('CUSTOMER_OPERATOR')"
    >
      CO
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="green"
      @click="handleUserRole('CUSTOMER_MANAGER')"
    >
      CM
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="primary"
      @click="handleUserRole('CUSTOMER_ADMIN')"
    >
      CA
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="orange"
      @click="handleUserRole('ACS_VIEWER')"
    >
      AV
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="green"
      @click="handleUserRole('ACS_MANAGER')"
    >
      AM
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="primary"
      @click="handleUserRole('ACS_ADMIN')"
    >
      AA
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="red"
      @click="handleUserRole('ACS_SUPER_ADMIN')"
    >
      SA
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    }
  },
  computed: {
    ...mapState('auth', ['buttonLoading'])
  },
  methods: {
    ...mapActions({
      'signIn': 'auth/signIn'
    }),
    handleUserRole (role) {
      const { 0: email, 1: password } = process.env[`VUE_APP_${role}_LOGIN`].split('|')

      this.signIn({ email, password })
    }
  }
}
</script>

<style>
.v-speed-dial {
  position: fixed;
  bottom: '50px';
  right: '50px';
}

.v-btn__content {
  font-size: 15px;
}
</style>