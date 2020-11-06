<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Account Information</v-card-title>
      <v-card-text>
        <v-form ref="profileForm" v-model="isProfileFormValid" lazy-validation @submit.prevent="submit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="customerProfile.address_1" label="Address Line 1"></v-text-field>
              <v-text-field v-model="customerProfile.address_2" label="Address Line 2"></v-text-field>
              <v-text-field v-model="customerProfile.zip" label="Zip Code"></v-text-field>
              <v-text-field v-model="customerProfile.city" label="City"></v-text-field>
              <v-text-field v-model="customerProfile.state" label="State"></v-text-field>
              <v-text-field v-model="customerProfile.country" label="Country"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="customerProfile.phone"
                value=""
                placeholder="123-456-7890"
                :rules="phoneRules"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <div class="d-flex">
            <v-btn>Reset</v-btn>
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

    phoneRules: [
      (v) => !!v || 'Phone number is required',
      (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
    ]
  }),
  computed: {
    ...mapState({
      isLoading: (state) => state.customers.button_loading
    })
  },
  methods: {
    ...mapActions({
      updateProfile: 'customers/updateProfile'
    }),
    submit() {
      if (this.$refs.profileForm.validate()) {
        this.updateProfile(this.customerProfile)
      }
    }
  }
}
</script>