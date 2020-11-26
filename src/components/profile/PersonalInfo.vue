<template>
  <div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="flex-grow-1 pt-2 pa-sm-2">
        <v-form ref="accountForm" v-model="isAccountValidForm" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="user.email"
            :rules="[$rules.required]"
            label="Email"
            outlined
            dense
            type="email"
            @input="resetErrors"
          ></v-text-field>
          <v-text-field
            v-model="user.username"
            :rules="[$rules.required]"
            label="Full name"
            outlined
            dense
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
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isAccountValidForm: true
    }
  },
  methods: {
    submit() {
      if (this.$refs.accountForm.validate()) {
        console.log(this.user)
      }
    },
    resetErrors() {
      this.$emit('clearError')
    }
  }
}
</script>