<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">Forgot Password?</v-card-title>
      <v-card-subtitle>
        Enter your account email address and we will send you a link to reset your password.
      </v-card-subtitle>

      <!-- reset form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="email"
            :rules="[$rules.required]"
            :validate-on-blur="false"
            :error="error"
            label="Email"
            name="email"
            outlined
            @keyup.enter="submit"
            @input="resetErrors"
          ></v-text-field>

          <error-component :error="errorMessages"></error-component>

          <v-btn
            block
            x-large
            color="primary"
            :loading="isLoading"
            :disabled="isLoading"
            @click="submit"
          >Request Password Reset</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      <router-link to="/auth/signin">
        Back to Sign In
      </router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Forgot Page Component
|---------------------------------------------------------------------
|
| Template to send email to remember/replace password
|
*/
import ErrorComponent from '../../components/common/ErrorComponent'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ErrorComponent
  },
  data() {
    return {
      // form
      isFormValid: true,
      email: '',

      // form error
      error: false
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.button_loading,
      errorMessages: (state) => state.auth.error
    })
  },
  methods: {
    ...mapActions({
      requestForgotPassword: 'auth/requestForgotPassword',
      clearError: 'auth/clearError'
    }),
    submit(e) {
      if (this.$refs.form.validate()) {
        this.requestForgotPassword(this.email)
      }
    },
    resetErrors() {
      this.clearError()
    }
  }
}
</script>
