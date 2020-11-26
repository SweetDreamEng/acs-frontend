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
              
              <div
                v-for="(location, i) in locations"
                :key="i"
              >
                <v-checkbox
                  v-model="selectedLocations"
                  :value="location.id"
                  :label="location.name"
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
                <div
                  v-if="selectedLocations.includes(location.id)"
                  class="d-flex flex-wrap px-2"
                >
                  <v-chip-group
                    v-model="selectedZones"
                    multiple
                    column
                  >
                    <v-chip
                      v-for="(zone, j) in zonesOfLocation(location.id)"
                      :key="j"
                      :value="zone.id"
                      filter
                      outlined
                      small
                      color="primary"
                    >
                      {{ zone.name }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </div>

              <error-component :error="errorMessages"></error-component>

              <div class="mt-2">
                <v-btn
                  color="primary"
                  :loading="button_loading"
                  :disabled="button_loading"
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
          to: '/users/list',
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
      isProfileFormValid: true,

      selectedLocations: [],
      selectedZones: []
    }
  },
  computed: {
    ...mapState({
      button_loading: (state) => state.users.button_loading,
      roles: (state) => state.roles.data,
      cities: (state) => state.cities.data,
      locations: (state) => state.locations.data,
      zones: (state) => state.zones.data,
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
      open: 'users/initCreateAccount',
      addCompanyUser: 'users/addCompanyUser',
      getCities: 'cities/getCities',
      clearError: 'users/clearError'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        if (this.$refs.profileForm.validate()) {
          const data = Object.assign(this.user, {
            zip: this.zipCode,
            locations: this.selectedLocations,
            zones: this.selectedZones
          })
          
          console.log(data)

          this.addCompanyUser(data)
        } else {
          this.tab = 1
        }
      }
    },
    zonesOfLocation(location_id) {
      return this.zones.filter((zone) => zone.location_id === location_id)
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
