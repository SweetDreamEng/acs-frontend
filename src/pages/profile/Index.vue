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
            <v-tabs-items v-model="tab">
              <v-tab-item>
                a
              </v-tab-item>
              <v-tab-item>
                b
              </v-tab-item>
              <v-tab-item>
                <v-card>
                  <v-card-title>Password</v-card-title>
                  <v-card-text>
                    <div class="d-flex flex-column flex-sm-row">
                      <div class="flex-grow-1 pt-2 pa-sm-2">
                        <v-form ref="passwordForm" v-model="isPasswordFormValid" lazy-validation @submit.prevent="submit">
                          <v-text-field
                            v-model="passwordForm.currentPassword"
                            :rules="[rules.required]"
                            label="Current Password"
                            outlined
                            type="password"
                            @input="resetErrors"
                          ></v-text-field>
                          <v-text-field
                            v-model="passwordForm.newPassword"
                            :rules="[rules.required]"
                            label="New Password"
                            outlined
                            type="password"
                            @input="resetErrors"
                          ></v-text-field>

                          <error-component :error="error"></error-component>

                          <div class="mt-2">
                            <v-btn type="submit" color="primary" :loading="isLoading">Save</v-btn>
                          </div>
                        </v-form>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/*
|---------------------------------------------------------------------
| Password Page Component
|---------------------------------------------------------------------
|
*/
import { mapState, mapActions } from 'vuex'
import ErrorComponent from '../../components/common/ErrorComponent'
import Overview from '../../components/profile/Overview'
export default {
  components: {
    ErrorComponent, Overview
  },
  data() {
    return {
      tab: null,

      isPasswordFormValid: true,

      passwordForm: {
        currentPassword: '',
        newPassword: ''
      },

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.button_loading,
      error: (state) => state.auth.error
    })
  },
  destroyed() {
    this.resetErrors()
  },
  methods: {
    ...mapActions({
      updatePassword: 'auth/updatePassword',
      clearError: 'auth/clearError'
    }),
    submit() {
      if (this.$refs.passwordForm.validate()) {
        this.updatePassword(this.passwordForm)
      }
    },
    resetErrors() {
      this.clearError()
    }
  }
}
</script>
