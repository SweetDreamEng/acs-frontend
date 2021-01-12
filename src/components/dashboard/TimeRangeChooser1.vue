<template>
  <v-dialog :value="dlg" width="400" persistent>
    <v-card>
      <v-card-title class="primary white--text">Time Range</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-radio-group
              v-model="locTimeRangeOption"
            >
              <v-radio
                v-for="(item, i) in timeRageOptions.slice(0, 5)"
                :key="i"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="6">
            <v-radio-group
              v-model="locTimeRangeOption"
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

        <v-expand-transition>
          <div v-show="locTimeRangeOption==='custom'">
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
                    v-model="locDateFrom"
                    label="From Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="locDateFrom"
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
                :return-value.sync="locTimeFrom"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="locTimeFrom"
                    label="From Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeFromMenu"
                  v-model="locTimeFrom"
                  @click:minute="$refs.timeFrom.save(locTimeFrom)"
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
                    v-model="locDateTo"
                    label="To Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="locDateTo"
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
                :return-value.sync="locTimeTo"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="locTimeTo"
                    label="To Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeToMenu"
                  v-model="locTimeTo"
                  @click:minute="$refs.timeTo.save(locTimeTo)"
                ></v-time-picker>
              </v-menu>
            </div>
          </div>
        </v-expand-transition>
        <div class="text-right">
          <v-btn color="primary" text @click="$emit('close')">Cancel</v-btn>
          <v-btn color="primary" @click="apply">Apply</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    dlg: {
      type: Boolean,
      default: false
    },
    timeRange: {
      type: Object,
      default: () => {
        return {
          timeRangeOption: 'last24Hours',
          dateFrom: new Date().toISOString().substr(0, 10),
          dateTo: new Date().toISOString().substr(0, 10),
          timeFrom: '00:00',
          timeTo: '00:00'
        }
      }
    }
  },
  data () {
    return {
      locTimeRangeOption: this.timeRange.timeRangeOption,
      dateFromMenu: false,
      timeFromMenu: false,
      dateToMenu: false,
      timeToMenu: false,
      locDateFrom: this.timeRange.dateFrom,
      locTimeFrom: this.timeRange.timeFrom,
      locDateTo: this.timeRange.dateTo,
      locTimeTo: this.timeRange.timeTo
    }
  },
  computed: {
    ...mapState('machines', ['timeRageOptions'])
  },
  watch: {
    timeRange (newValue) {
      this.locTimeRangeOption = newValue.timeRangeOption
      this.locDateFrom = newValue.dateFrom
      this.locTimeFrom = newValue.timeFrom
      this.locDateTo = newValue.dateTo
      this.locTimeTo = newValue.timeT
    }
  },
  methods: {
    dlgBtnClicked() {
      this.$emit('close')
    },
    apply() {
      this.$emit('submit', {
        timeRangeOption: this.locTimeRangeOption,
        dateFrom: this.locDateFrom,
        dateTo: this.locDateTo,
        timeFrom: this.locTimeFrom,
        timeTo: this.locTimeTo
      })
    }
  }
}
</script>
