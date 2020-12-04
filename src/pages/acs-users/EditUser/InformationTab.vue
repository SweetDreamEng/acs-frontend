<template>
  <v-card class="my-2">
    <v-card-title>User Information</v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="isFormValid"
        lazy-validation
        class="flex-grow-1 pt-2 pa-sm-2"
        @submit.prevent="save"
      >
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
              :rules="[$rules.required]"
              label="Country"
              outlined
              dense
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.phone"
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
          <v-btn
            color="primary"
            :loading="buttonLoading"
            @click="save"
          >
            Save
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import states from '../../../services/data/states'

import { mapState, mapActions } from 'vuex'

export default {
  props: {
    buttonLoading: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isFormValid: true,

    states
  }),
  computed: {
    ...mapState({
      cities: (state) => state.cities.data
    }),
    zipCode() {
      const _zip = this.cities.find((city) => city.city === this.user.city)

      return _zip ? _zip.zip : ''
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    ...mapActions({
      getCities: 'cities/getCities'
    }),
    onStateChange() {
      this.getCities(this.user.state)
    },
    save() {
      if (this.$refs.form.validate()) {
        const data = Object.assign(this.user, {
          zip: this.zipCode
        })

        this.$emit('submit', data)
      }
    }
  }
}
</script>
