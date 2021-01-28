<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-row dense>
      <v-col sm="4" xs="12">
        <Overview :user="user"></Overview>
      </v-col>
      <v-col sm="8" xs="12">
        <v-card>
          <v-card-text>
            <v-tabs v-model="tab">
              <v-tab>Personal Info</v-tab>
              <v-tab>Password</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" class="my-2">
              <v-tab-item>
                <personal-info
                  :is-btn-loading="isBtnLoading"
                  :user="user"
                  :error="error"
                  @clearError="clearError"
                >
                </personal-info>
              </v-tab-item>
              <v-tab-item>
                <password-reset
                  :is-btn-loading="isBtnLoading"
                  :error="error"
                  @submit="submitPassword"
                  @clearError="clearError"
                >
                </password-reset>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="6">
        <time-zone
          @submit="submitTimezone"
        >
        </time-zone>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PersonalInfo from '../../components/profile/PersonalInfo'
import PasswordReset from '../../components/profile/PasswordReset'
import Overview from '../../components/profile/Overview'
import TimeZone from '../../components/profile/TimeZone'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    PasswordReset,
    PersonalInfo,
    Overview,
    TimeZone
  },
  data() {
    return {
      tab: null
    }
  },
  computed: {
    ...mapState({
      isBtnLoading: (state) => state.auth.button_loading,
      user: (state) => state.auth.user,
      error: (state) => state.auth.error
    })
  },
  methods: {
    ...mapActions({
      updatePassword: 'auth/updatePassword',
      updateTimezome: 'auth/updateTimezome'
    }),
    submitPassword(data) {
      this.updatePassword(data)
    },
    submitTimezone(data) {
      this.updateTimezome(data)
    },
    clearError() {
      this.$store.commit('auth/CLEAR_ERROR')
    }
  }
}
</script>
