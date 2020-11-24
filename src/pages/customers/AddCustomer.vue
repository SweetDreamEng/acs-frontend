<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Add New Company</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab>Account</v-tab>
      <v-tab>Information</v-tab>
    </v-tabs>

    <v-tabs-items>
      <v-card class="my-2" v-show="tab === 0">
        <v-card-title>Basic Information</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div class="flex-grow-1 pt-2 pa-sm-2">
              <v-form ref="accountForm" v-model="isAccountFormValid" lazy-validation @submit.prevent="submit">
                <v-text-field
                  v-model="customer.companyName"
                  :rules="[rules.required]"
                  :validate-on-blur="false"
                  label="Company Name"
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
                  >Save</v-btn>
                </div>
              </v-form>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="my-2" v-show="tab === 1">
        <v-card-title>Account Information</v-card-title>
        <v-card-text  ref="b">
          <v-form ref="profileForm" v-model="isProfileFormValid" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="customer.address_1"
                  label="Address Line 1"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-text-field
                  v-model="customer.address_2"
                  label="Address Line 2"
                  :rules="[rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-select
                  v-model="customer.state"
                  label="State"
                  :items="states"
                  :rules="[rules.required]"
                  outlined
                  dense
                  @change="onStateChange"
                >
                </v-select>
                <v-combobox
                  v-model="customer.city"
                  :items="cities"
                  label="City"
                  item-text="city"
                  :return-object="false"
                  :rules="[rules.required]"
                  outlined
                  dense
                ></v-combobox>
                <v-text-field
                  :value="zipCode"
                  label="Zip Code"
                  :rules="[rules.required]"
                  outlined
                  dense
                  readonly
                >
                </v-text-field>
                <v-text-field
                  v-model="customer.country"
                  :rules="[rules.required]"
                  label="Country"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="customer.phone"
                  v-mask="'###-###-####'"
                  placeholder="123-456-7890"
                  :rules="[rules.required, rules.phoneFormat]"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>

            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onBack">Back</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-tabs-items>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Add Customer Page Component
| url: /customers/add
|---------------------------------------------------------------------
|
| Create a new customer
*/
import states from '../../services/data/states'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      tab: 0,

      breadcrumbs: [
        {
          text: 'Companies',
          to: '/customers/list',
          exact: true
        },
        {
          text: 'Add New Company'
        }
      ],
      
      states,

      customer: {
        'companyName': '',
        'administratorName': '',
        'administratorEmail': '',
        'address_1': '',
        'address_2': '',
        'state': '',
        'city': '',
        'country': '',
        'phone': ''
      },
      
      isAccountFormValid: true,
      isProfileFormValid: true,

      rules: {
        required: (value) => (value && Boolean(value)) || 'Required',
        emailFormat: (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        phoneFormat: (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
      }
    }
  },
  computed: {
    ...mapState({
      button_loading: (state) => state.customers.button_loading,
      cities: (state) => state.cities.data
    }),
    zipCode() {
      const _zip = this.cities.find((city) => city.city === this.customer.city)

      return _zip ? _zip.zip : ''
    }
  },
  methods: {
    ...mapActions({
      addCustomer: 'customers/addCustomer',
      getCities: 'customers/getCities'
    }),
    onStateChange() {
      this.getCities(this.customer.state)
    },
    submit() {
      if (this.$refs.accountForm.validate()) {
        if (this.$refs.profileForm.validate()) {
          const data = Object.assign(this.customer, {
            zip: this.zipCode
          })
          
          this.addCustomer(data)
        } else {
          this.tab = 1
        }
      }
    },
    onBack() {
      if (this.$refs.profileForm.validate()) {
        this.tab = 0
      }
    }
  }
}
</script>
