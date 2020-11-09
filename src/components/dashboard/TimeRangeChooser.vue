<template>
  <v-card>
    <v-card-title class="primary white--text">Time Range</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-radio-group
            v-model="loc_timeRange"
          >
            <v-radio
              v-for="(item, i) in timeRageOptions.slice(0, 5)"
              :key="i"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-radio-group
            v-model="loc_timeRange"
          >
            <v-radio
              v-for="(item, i) in timeRageOptions.slice(5, 10)"
              :key="i"
              :label="item.label"
              :value="item.value"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-expand-transition>
        <div v-show="loc_timeRange==='custom'">
          <div class="d-flex">
            <v-menu
              ref="dateFrom"
              v-model="dateFromMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              width="250px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFrom"
                  label="From Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateFrom"
                no-title
                scrollable
                @input="dateFromMenu = false"
              >
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="timeFrom"
              v-model="timeFromMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeFrom"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeFrom"
                  label="From Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="timeFromMenu"
                v-model="timeFrom"
                @click:minute="$refs.timeFrom.save(timeFrom)"
              ></v-time-picker>
            </v-menu>
          </div>

          <div class="d-flex">
            <v-menu
              ref="dateTo"
              v-model="dateToMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              width="250px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateTo"
                  label="To Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dateTo"
                no-title
                scrollable
                @input="dateToMenu = false"
              >
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="timeTo"
              v-model="timeToMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeTo"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeTo"
                  label="To Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="timeToMenu"
                v-model="timeTo"
                @click:minute="$refs.timeTo.save(timeTo)"
              ></v-time-picker>
            </v-menu>
          </div>
        </div>
      </v-expand-transition>
      <div class="text-right">
        <v-btn color="primary" text @click="$emit('cancel')">Cancel</v-btn>
        <v-btn color="primary" @click="$emit('apply', loc_timeRange)">Apply</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    timeRange: {
      type: String,
      default: 'last24Hours'
    },
    timeRageOptions: {
      type: Array,
      default: () => [
        []
      ]
    }
  },
  data () {
    return {
      loc_timeRange: this.timeRange,
      dateFromMenu: false,
      dateFrom: '',
      timeFromMenu: false,
      timeFrom: '',
      dateToMenu: false,
      dateTo: '',
      timeToMenu: false,
      timeTo: ''
    }
  }
}
</script>