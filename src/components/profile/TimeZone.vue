<template>
  <v-card class="flex-grow-1 pt-2 pa-sm-2">
    <v-card-title>Timezone setting</v-card-title>
    <v-card-text>
      <v-form ref="accountForm" v-model="isAccountValidForm" lazy-validation @submit.prevent="submit">
        <v-combobox
          v-model="timezone"
          :items="timeZones"
          label="Timezone"
          item-text="name"
          item-value="id"
          :rules="[$rules.required]"
          outlined
          dense
        ></v-combobox>
        <div class="mt-2">
          <v-btn type="submit" color="primary" :loading="loading">Save</v-btn>
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
      timezone: 'America/Belize'
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.auth.updatingTimezone,
      timeZoneNames: (state) => state.auth.timeZoneNames,
      userTimeZone: (state) => state.auth.userTimeZone
    }),
    timeZones() {
      const date = new Date
      
      return this.timeZoneNames.map((timeZone) => {
        const _t = date.toLocaleString('en-US', {
          timeZone: `${timeZone.name}`
        })

        return {
          id: timeZone.id,
          name: `${timeZone.name} (${_t})`
        }
      })
    }
  },
  mounted() {
    this.getTimezoneNames()
    // console.log(moment.tz('America/Los_Angeles').utcOffset())
  },
  methods: {
    ...mapActions({
      updateTimezone: 'auth/updateTimezone',
      getTimezoneNames: 'auth/getTimezoneNames'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        this.updateTimezone(this.timezone.id)
      }
    }
  }
}
</script>