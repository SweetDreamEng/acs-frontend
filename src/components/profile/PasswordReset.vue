<template>
  <div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="flex-grow-1 pt-2 pa-sm-2">
        <v-form ref="passwordForm" v-model="isPasswordFormValid" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="passwordForm.currentPassword"
            :rules="[$rules.required]"
            label="Current Password"
            dense
            outlined
            type="password"
            @input="resetErrors"
          ></v-text-field>
          <v-text-field
            v-model="passwordForm.newPassword"
            :rules="[$rules.required]"
            label="New Password"
            dense
            outlined
            type="password"
            @input="resetErrors"
          ></v-text-field>

          <error-component :error="error"></error-component>

          <div class="mt-2">
            <v-btn type="submit" color="primary" :loading="isBtnLoading">Save</v-btn>
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
  props: {
    isBtnLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isPasswordFormValid: true,

      passwordForm: {
        currentPassword: '',
        newPassword: ''
      }
    }
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