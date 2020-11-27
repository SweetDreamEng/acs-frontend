<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Add New User</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab>Account</v-tab>
      <v-tab>Information</v-tab>
    </v-tabs>

    <v-tabs-items>
      <v-card v-show="tab === 0" class="my-2">
        <v-card-title>Basic Information</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div>
              <v-avatar
                v-if="user.name"
                color="primary"
                size="68"
              >
                <span class="white--text headline">{{ user.name | initials }}</span>
              </v-avatar>
            </div>
            <v-form
              ref="accountForm"
              v-model="isAccountFormValid"
              lazy-validation
              class="flex-grow-1 pt-2 pa-sm-2"
              @submit.prevent="save"
            >
              <v-text-field
                v-model="user.name"
                label="Display name"
                placeholder="name"
                :rules="[$rules.required]"
                outlined
                dense
                @input="clearError"
              >
              </v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                placeholder="Email"
                :rules="[$rules.required, $rules.emailFormat]"
                outlined
                dense
                @input="clearError"
              >
              </v-text-field>
              <v-select
                v-model="user.role"
                :items="roles"
                label="Role"
                placeholder="Role"
                item-value="id"
                item-text="name"
                :rules="[$rules.required]"
                outlined
                dense
                @input="clearError"
              >
              </v-select>

              <error-component :error="errorMessages"></error-component>

              <div class="mt-2">
                <v-btn
                  color="primary"
                  text
                  class="mr-2"
                  to="/acs-admin/users/list"
                >Cancel</v-btn>
                <v-btn
                  color="primary"
                  :loading="isBtnLoading"
                  :disabled="isBtnLoading"
                  @click="submit"
                >Save</v-btn>
              </div>
            </v-form>
          </div>
        </v-card-text>
      </v-card>

      <v-card v-show="tab === 1" class="my-2">
        <v-card-title>User Information</v-card-title>
        <v-card-text>
          <v-form ref="profileForm" v-model="isProfileFormValid" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.address_1"
                  label="Address"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
                <v-select
                  v-model="user.state"
                  label="State"
                  :items="states"
                  :rules="[$rules.required]"
                  outlined
                  dense
                  @change="onStateChange"
                >
                </v-select>
                <v-combobox
                  v-model="user.city"
                  :items="cities"
                  label="City"
                  item-text="city"
                  :return-object="false"
                  :rules="[$rules.required]"
                  :disabled="!user.state"
                  outlined
                  dense
                ></v-combobox>
                <v-text-field
                  :value="zipCode"
                  label="Zip Code"
                  :rules="[$rules.required]"
                  :disabled="!user.state || !user.city"
                  outlined
                  dense
                  readonly
                >
                </v-text-field>
                <v-text-field
                  v-model="user.country"
                  label="Country"
                  :rules="[$rules.required]"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.phone"
                  v-mask="'###-###-####'"
                  label="Phone"
                  placeholder="123-456-7890"
                  outlined
                  dense
                  :rules="[$rules.required, $rules.phoneFormat]"
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
| User Create Page Component
| url: /users/add
|---------------------------------------------------------------------
|
| Create a new user
*/

import states from '../../services/data/states'
import ErrorComponent from '../../components/common/ErrorComponent'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ErrorComponent
  },
  data() {
    return {
      tab: 0,
      breadcrumbs: [
        {
          text: 'Users',
          to: '/acs-admin/users/list',
          exact: true
        },
        {
          text: 'Add New User'
        }
      ],

      states,

      user: {
        name: '',
        email: '',
        role: '',
        address_1: '',
        state: '',
        city: '',
        country: 'US',
        phone: ''
      },

      isAccountFormValid: true,
      isProfileFormValid: true
    }
  },
  computed: {
    ...mapState({
      isBtnLoading: (state) => state.users.button_loading,
      roles: (state) => state.users.roles,
      cities: (state) => state.cities.data,
      errorMessages: (state) => state.users.error
    }),
    zipCode() {
      const _zip = this.cities.find((city) => city.city === this.user.city)

      return _zip ? _zip.zip : ''
    }
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      open: 'users/initCreateAcsUser',
      addAcsUser: 'users/addAcsUser',
      getCities: 'cities/getCities',
      clearError: 'users/clearError'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        if (this.$refs.profileForm.validate()) {
          const data = Object.assign(this.user, {
            zip: this.zipCode
          })
          
          this.addAcsUser(data)
        } else {
          this.tab = 1
        }
      }
    },
    onBack() {
      if (this.$refs.profileForm.validate()) {
        this.tab = 0
      }
    },
    onStateChange() {
      this.getCities(this.user.state)
    }
  }
}
</script>
