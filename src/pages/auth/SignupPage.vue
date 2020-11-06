<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{ $t('register.title') }}</v-card-title>
      <v-card-subtitle>Let's build amazing products</v-card-subtitle>

      <!-- sign up form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errorName"
            :error-messages="errorNameMessage"
            :label="$t('register.name')"
            name="name"
            outlined
            @keyup.enter="submit"
            @input="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errorEmail"
            :error-messages="errorEmailMessage"
            :label="$t('register.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @input="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="errorPassword"
            :error-messages="errorPasswordMessage"
            :label="$t('register.password')"
            name="password"
            outlined
            @input="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-alert
            v-if="errorMessages"
            dense
            outlined
            type="error"
          >
            {{ errorMessages }}
          </v-alert>

          <v-btn
            :loading="isLoading"
            :disabled="isLoading"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t('register.button') }}</v-btn>

          <div v-if="errorProvider" class="error--text">{{ errorProviderMessages }}</div>

          <div class="mt-5 overline">
            {{ $t('register.agree') }}
            <br />
            <router-link to="">{{ $t('common.tos') }}</router-link>
            &
            <router-link to="">{{ $t('common.policy') }}</router-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('register.account') }}
      <router-link to="/auth/signin" class="font-weight-bold">
        {{ $t('register.signin') }}
      </router-link>
    </div>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign Up Page Component
|---------------------------------------------------------------------
|
| Template for user sign up with external providers buttons
|
*/
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      // form
      isFormValid: true,
      email: '',
      password: '',
      name: '',

      // form error
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      errorNameMessage: '',
      errorEmailMessage: '',
      errorPasswordMessage: '',

      errorProvider: false,
      errorProviderMessages: '',

      // show password field
      showPassword: false,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.auth.button_loading,
      errorMessages: (state) => state.auth.error
    })
  },
  mounted() {
    this.clearError()
  },
  methods: {
    ...mapActions({
      'signup': 'auth/signup',
      'clearError': 'auth/clearError'
    }),
    submit() {
      if (this.$refs.form.validate()) {
        this.signup({
          name: this.name,
          email: this.email,
          password: this.password
        })
      }
    },
    signInProvider(provider) {},
    resetErrors() {
      this.clearError()
      // this.errorName = false
      // this.errorEmail = false
      // this.errorPassword = false
      // this.errorNameMessage = ''
      // this.errorEmailMessage = ''
      // this.errorPasswordMessage = ''

      // this.errorProvider = false
      // this.errorProviderMessages = ''
    }
  }
}
</script>
