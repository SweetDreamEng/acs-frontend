<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Basic Information</v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div class="flex-grow-1 pt-2 pa-sm-2">
            <v-form ref="accountForm" v-model="isAccountFormValid" lazy-validation @submit.prevent="submit">
              <v-text-field
                v-model="customer.companyName"
                :rules="[rules.required]"
                :validate-on-blur="false"
                label="Customer/Company Name"
                placeholder="Ex: Acme Inc"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="customer.administratorName"
                :rules="[rules.required]"
                :validate-on-blur="false"
                label="Administrator Name"
                placeholder="Jane Doe"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="customer.administratorEmail"
                :rules="[rules.required, rules.emailFormat]"
                :validate-on-blur="false"
                label="Administrator Email"
                placeholder="jane.doe@example.com"
                outlined
                dense
              ></v-text-field>
              <div class="mt-2">
                <v-btn
                  type="submit"
                  color="primary"
                  :loading="button_loading"
                >Save</v-btn>
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
| Account tab in customer add page
*/
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      customer: {
        'companyName': '',
        'administratorName': '',
        'administratorEmail': ''
      },
      isAccountFormValid: true,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required',
        emailFormat: (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      }
    }
  },
  computed: {
    ...mapState({
      button_loading: (state) => state.customers.button_loading
    })
  },
  methods: {
    ...mapActions({
      addCustomer: 'customers/addCustomer'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        this.addCustomer(this.customer)
      }
    }
  }
}
</script>
