<template>
  <div>
    <div class="text-right">
      <v-btn
        rounded
        outlined
        color="primary"
        dark
        @click="dlgBtnClicked"
      >
        Local Time: {{ timeRangeLabel }}
      </v-btn>
    </div>
    <v-dialog v-model="dlg" width="400">
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
                v-model="tmpTimeRange"
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
                v-model="tmpTimeRange"
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
            <div v-show="tmpTimeRange==='custom'">
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
            <v-btn color="primary" text @click="dlg = false">Cancel</v-btn>
            <v-btn color="primary" @click="apply">Apply</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      dlg: false,

      timeRageOptions: [
        {
          label: 'Last 30 minutes',
          value: 'last30Min'
        },
        {
          label: 'Last hour',
          value: 'lastHour'
        },
        {
          label: 'Last 4 hours',
          value: 'last4Hours'
        },
        {
          label: 'Last 12 hours',
          value: 'last12Hours'
        },
        {
          label: 'Last 24 hours',
          value: 'last24Hours'
        },
        {
          label: 'Last 48 hours',
          value: 'last48Hours'
        },
        {
          label: 'Last 3 days',
          value: 'last3Days'
        },
        {
          label: 'Last 7 days',
          value: 'last7Days'
        },
        {
          label: 'Last 24 days',
          value: 'last24Days'
        },
        {
          label: 'Custom',
          value: 'custom'
        }
      ],
      timeRange: 'last24Hours',

      tmpTimeRange: this.timeRange,
      dateFromMenu: false,
      dateFrom: '',
      timeFromMenu: false,
      timeFrom: '',
      dateToMenu: false,
      dateTo: '',
      timeToMenu: false,
      timeTo: ''
    }
  },
  computed: {
    timeRangeLabel() {
      return this.timeRageOptions.find((range) => range.value === this.timeRange).label
    }
  },
  methods: {
    dlgBtnClicked() {
      this.dlg = true
      this.tmpTimeRange = this.timeRange
    },
    apply() {
      this.timeRange = this.tmpTimeRange
      this.dlg = false
    }
  }
}
</script>