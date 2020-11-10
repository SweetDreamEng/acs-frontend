<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-row>
      <v-col xs="12" sm="4" md="4">
        <Overview></Overview>
      </v-col>
      <v-col xs="12" sm="8" md="8">
        <v-card>
          <v-card-text>
            <v-tabs v-model="tab">
              <v-tab>Personal Info</v-tab>
              <v-tab>Avatar</v-tab>
              <v-tab>Password</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" class="my-2">
              <v-tab-item>
                <personal-info></personal-info>
              </v-tab-item>
              <v-tab-item>
                b
              </v-tab-item>
              <v-tab-item>
                <password-reset></password-reset>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PersonalInfo from '../../components/profile/PersonalInfo'
import PasswordReset from '../../components/profile/PasswordReset'
import Overview from '../../components/profile/Overview'
export default {
  components: {
    PasswordReset,
    PersonalInfo,
    Overview
  },
  data() {
    return {
      tab: null
    }
  }
}
</script>
