<template>
  <v-card class="flex-grow-1 pt-2 pa-sm-2">
    <v-card-title>Timezone setting</v-card-title>
    <v-card-text>
      <v-form ref="accountForm" v-model="isAccountValidForm" lazy-validation @submit.prevent="submit">
        <v-combobox
          :loading="loading"
          :disabled="loading"
          v-model="locTimezone"
          :items="timeZones"
          label="Timezone"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          outlined
          dense
        ></v-combobox>
        <div class="mt-2">
          <v-btn type="submit" color="primary" :loading="updating">Save</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>

import moment from 'moment'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      isAccountValidForm: true,
      locTimezone: null
    }
  },
  computed: {
    ...mapState({
      updating: (state) => state.auth.updatingTimezone,
      loading: (state) => state.auth.loadingTimezone,
      profile: (state) => state.auth.profile.profile,
      timeZoneNames: (state) => state.auth.timeZoneNames
    }),
    timeZones() {
      const date = new Date
      
      return this.timeZoneNames.map((timeZone) => {
        const minutes = moment.tz(timeZone.name).utcOffset()
        const h = minutes / 60 | 0, m = minutes % 60 | 0
        const _t = moment.utc().hours(h).minutes(m).format('hh:mm')

        return {
          id: timeZone.id,
          name: `${timeZone.name} (UTC ${_t})`
        }
      })
    },
    userTimezone() {
      return this.timeZones.find((item) => item.id === this.profile.timezone)
    }
  },
  mounted() {
    this.getUser().then(() => {
      if (this.timeZoneNames)
        this.locTimezone = this.userTimezone
    })
    this.getTimezoneNames().then(() => {
      if (this.profile)
        this.locTimezone = this.userTimezone
    })
    // console.log(moment.tz('America/Los_Angeles').utcOffset())
  },
  methods: {
    ...mapActions({
      getUser: 'auth/getUser',
      updateTimezone: 'auth/updateTimezone',
      getTimezoneNames: 'auth/getTimezoneNames'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        this.updateTimezone(this.locTimezone.id)
      }
    }
  }
}
</script>