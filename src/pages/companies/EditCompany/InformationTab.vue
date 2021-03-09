<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Account Information</v-card-title>
      <v-card-text>
        <v-form
          v-if="companyProfile"
          ref="profileForm"
          v-model="isProfileFormValid"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="companyProfile.address_1"
                label="Address"
                :rules="[$rules.required]"
                outlined
                dense
              >
              </v-text-field>
              <v-select
                v-model="companyProfile.state"
                label="State"
                :items="states"
                :rules="[$rules.required]"
                outlined
                dense
                @change="onStateChange"
              >
              </v-select>
              <v-combobox
                v-model="companyProfile.city"
                :items="cities"
                label="City"
                item-text="city"
                :return-object="false"
                :rules="[$rules.required]"
                :disabled="!companyProfile.state"
                outlined
                dense
              ></v-combobox>
              <v-text-field
                :value="zipCode"
                label="Zip Code"
                :rules="[$rules.required]"
                :disabled="!companyProfile.state || !companyProfile.city"
                outlined
                dense
                readonly
              >
              </v-text-field>
              <v-text-field
                v-model="companyProfile.country"
                :rules="[$rules.required]"
                label="Country"
                outlined
                dense
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="companyProfile.phone"
                v-mask="'###-###-####'"
                placeholder="123-456-7890"
                :rules="[$rules.required, $rules.phoneFormat]"
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
| Information tab in company edit page
*/
import states from '../../../services/data/states'
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    companyProfile: {
      type: Object,
      default: () => ({
        address_1: '',
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
    
    states
  }),
  computed: {
    ...mapState({
      isLoading: (state) => state.companies.buttonLoading,
      cities: (state) => state.cities.data
    }),
    zipCode() {
      const _zip = this.cities.find((city) => city.city === this.companyProfile.city)

      return _zip ? _zip.zip : ''
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'companies/updateProfile',
      getCities: 'cities/getCities'
    }),
    onStateChange() {
      this.getCities(this.companyProfile.state)
    },
    submit() {
      if (this.$refs.profileForm.validate()) {
        const data = Object.assign(this.companyProfile, {
          zip: this.zipCode
        })

        this.updateProfile(data)
      }
    }
  }
}
</script>