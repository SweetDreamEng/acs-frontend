<template>
  <div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="flex-grow-1 pt-2 pa-sm-2">
        <v-form ref="accountForm" v-model="isAccountValidForm" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="accountForm.loc_email"
            :rules="[rules.required]"
            label="Email"
            outlined
            type="email"
            @input="resetErrors"
          ></v-text-field>
          <v-text-field
            v-model="accountForm.loc_name"
            :rules="[rules.required]"
            label="Full name"
            outlined
            @input="resetErrors"
          ></v-text-field>

          <error-component :error="error"></error-component>

          <div class="mt-2">
            <v-btn type="submit" color="primary" :loading="isLoading">Save</v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ErrorComponent from '../common/ErrorComponent'
export default {
  components: {
    ErrorComponent
  },
  data() {
    return {
      isAccountValidForm: true,

      accountForm: {
        loc_email: '',
        loc_name: ''
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
      error: (state) => state.auth.error,
      user: (state) => state.auth.user
    })
  },
  created() {

  },
  mounted() {
    this.accountForm.loc_email = this.user.email
    this.accountForm.loc_name = this.user.username
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
      if (this.$refs.accountForm.validate()) {
        // this.updatePassword(this.accountForm)
      }
    },
    resetErrors() {
      this.clearError()
    }
  }
}
</script>