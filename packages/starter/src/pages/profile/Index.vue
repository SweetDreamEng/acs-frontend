<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card class="my-2">
      <v-card-title>Password</v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-form ref="passwordForm" v-model="isPasswordFormValid" lazy-validation @submit.prevent="submit">
              <v-text-field
                v-model="passwordForm.currentPassword"
                :rules="[rules.required]"
                label="Current Password"
                type="password"
                @input="resetErrors"
              ></v-text-field>
              <v-text-field
                v-model="passwordForm.newPassword"
                :rules="[rules.required]"
                label="New Password"
                type="password"
                @input="resetErrors"
              ></v-text-field>

              <v-alert
                v-if="error"
                dense
                outlined
                type="error"
              >
                {{ error }}
              </v-alert>

              <div class="mt-2">
                <v-btn type="submit" color="primary" :loading="isLoading">Save</v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </v-card-text>
    </v-card>
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
export default {
  data() {
    return {
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
