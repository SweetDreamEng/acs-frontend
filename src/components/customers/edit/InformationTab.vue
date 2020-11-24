<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Account Information</v-card-title>
      <v-card-text>
        <v-form ref="profileForm" v-model="isProfileFormValid" lazy-validation @submit.prevent="submit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="customerProfile.address_1"
                label="Address Line 1"
                :rules="[rules.required]"
                outlined
                dense
              >
              </v-text-field>
              <v-text-field
                v-model="customerProfile.address_2"
                label="Address Line 2"
                :rules="[rules.required]"
                outlined
                dense
              >
              </v-text-field>
              <v-select
                v-model="customerProfile.state"
                label="State"
                :items="states"
                :rules="[rules.required]"
                outlined
                dense
                @change="onStateChange"
              >
              </v-select>
              <v-combobox
                v-model="customerProfile.city"
                :items="cities"
                label="City"
                item-text="city"
                :return-object="false"
                :rules="[rules.required]"
                :disabled="!customerProfile.state"
                outlined
                dense
              ></v-combobox>
              <v-text-field
                :value="zipCode"
                label="Zip Code"
                :rules="[rules.required]"
                :disabled="!customerProfile.state || !customerProfile.city"
                outlined
                dense
                readonly
              >
              </v-text-field>
              <v-text-field
                v-model="customerProfile.country"
                :rules="[rules.required]"
                label="Country"
                outlined
                dense
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="customerProfile.phone"
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
            <v-btn color="primary" type="submit" :loading="isLoading">Save</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Information Tab Component
|---------------------------------------------------------------------
|
| Information tab in customer edit page
*/
import states from '../../../services/data/states'
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    customerProfile: {
      type: Object,
      default: () => ({
        address_1: '',
        address_2: '',
        zip: '',
        state: '',
        city: '',
        country: '',
        phone: ''
      })
    }
  },
  data: () => ({
    isProfileFormValid: true,
    
    states,

    rules: {
      required: (value) => (value && Boolean(value)) || 'Required',
      phoneFormat: (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
    }
  }),
  computed: {
    ...mapState({
      isLoading: (state) => state.customers.button_loading,
      cities: (state) => state.cities.data
    }),
    zipCode() {
      const _zip = this.cities.find((city) => city.city === this.customerProfile.city)

      return _zip ? _zip.zip : ''
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'customers/updateProfile',
      getCities: 'customers/getCities'
    }),
    onStateChange() {
      this.getCities(this.customerProfile.state)
    },
    submit() {
      if (this.$refs.profileForm.validate()) {
        const data = Object.assign(this.customerProfile, {
          zip: this.zipCode
        })

        this.updateProfile(data)
      }
    }
  }
}
</script>