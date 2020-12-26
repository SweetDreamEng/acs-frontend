<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Basic Information</v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-form
              v-if="customerAccount"
              ref="accountForm"
              v-model="isAccountFormValid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-combobox
                v-model="customerAccount.companyName"
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
                v-model="customerAccount.name"
                :rules="[$rules.required]"
                :validate-on-blur="false"
                dense
                outlined
                label="Administrator Name"
                @input="resetErrors"
              ></v-text-field>
              <v-text-field
                v-model="customerAccount.email"
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

    <v-expansion-panels v-model="panel" multiple class="mt-3">
      <v-expansion-panel>
        <v-expansion-panel-header class="title">Actions</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="mb-2">
            <div class="title">Reset User Password</div>
            <div class="subtitle mb-2">Sends a reset password email to the user.</div>
            <v-btn
              class="mb-2"
              @click
            >
              <v-icon left small>mdi-email</v-icon>Send Reset Password Email
            </v-btn>
          </div>

          <v-divider></v-divider>

          <div class="my-2">
            <div class="error--text title">Danger Zone</div>
            <div class="subtitle mb-2">Full administrator with access to this dashboard.</div>

            <v-divider></v-divider>

            <div class="subtitle mt-3 mb-2">Prevent the user from signing in on the platform.</div>
            <div class="my-2">
              <v-btn
                v-if="user.disabled"
                color="warning"
                @click="user.disabled = false"
              >
                <v-icon left small>mdi-account-check</v-icon>Enable User
              </v-btn>
              <v-btn
                v-else
                color="warning"
                @click="disableDialog = true"
              >
                <v-icon left small>mdi-cancel</v-icon>Disable User
              </v-btn>
            </div>

            <v-divider></v-divider>
            <div
              class="subtitle mt-3 mb-2"
            >To delete the user please transfer ownership or delete user's subscriptions.</div>
            <v-btn color="error" @click="deleteDialog = true">
              <v-icon left small>mdi-delete</v-icon>Delete User
            </v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
/*
|---------------------------------------------------------------------
| Account Tab Component
|---------------------------------------------------------------------
|
| Account tab in customer edit page
*/
import { mapState, mapActions } from 'vuex'
import ErrorComponent from '../../common/ErrorComponent'

export default {
  components: {
    ErrorComponent
  },
  props: {
    customerAccount: {
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
      isLoading: (state) => state.customers.button_loading,
      error: (state) => state.customers.error
    })
  },
  destroyed() {
    this.resetErrors()
  },
  methods: {
    ...mapActions({
      updateAccount: 'customers/updateAccount',
      clearError: 'customers/clearError'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        this.updateAccount(this.customerAccount)
      }
    },
    resetErrors() {
      this.clearError()
    }
  }
}
</script>
