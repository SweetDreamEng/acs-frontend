<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Basic Information</v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-form
              v-if="companyAccount"
              ref="accountForm"
              v-model="isAccountFormValid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-combobox
                v-model="companyAccount.companyName"
                :items="companies"
                label="Company"
                placeholder="Type in new company name or choose from existing for ex: Acme Inc"
                item-text="name"
                :return-object="false"
                :rules="[$rules.required]"
                outlined
                dense
                @input="resetErrors"
              ></v-combobox>
              <v-text-field
                v-model="companyAccount.name"
                :rules="[$rules.required]"
                :validate-on-blur="false"
                dense
                outlined
                label="Administrator Name"
                @input="resetErrors"
              ></v-text-field>
              <v-text-field
                v-model="companyAccount.email"
                :rules="[$rules.required, $rules.emailFormat]"
                :validate-on-blur="false"
                dense
                outlined
                label="Administrator Email"
                @input="resetErrors"
              ></v-text-field>

              <error-component :error="error"></error-component>

              <div class="d-flex mt-2">
                <v-spacer></v-spacer>
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
| Account Tab Component
|---------------------------------------------------------------------
|
| Account tab in company edit page
*/
import { mapState, mapActions } from 'vuex'
import ErrorComponent from '../../../components/common/ErrorComponent'

export default {
  components: {
    ErrorComponent
  },
  props: {
    companyAccount: {
      type: Object,
      default: () => {}
    },
    companies: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      isAccountFormValid: true,

      panel: [1],

      user: {
        'disabled':true,
        'role':'ADMIN'
      }
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.companies.buttonLoading,
      error: (state) => state.companies.error
    })
  },
  destroyed() {
    this.resetErrors()
  },
  methods: {
    ...mapActions({
      updateAccount: 'companies/updateAccount'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        this.updateAccount(this.companyAccount)
      }
    },
    resetErrors() {
      this.$store.commit('auth/CLEAR_ERROR')
    }
  }
}
</script>
