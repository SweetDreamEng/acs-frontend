<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" style="max-height: 100px">
          <div class="d-flex" style="justify-content: flex-end">
            <v-col cols="4">
              <date-range-picker
                @onDateRangeSelected="handleDateRangeSelected"
              ></date-range-picker>
            </v-col>
          </div>
        </v-col>
        <v-col cols="12" style="max-height: 5px; font-size: 20px;">
          All Machines <v-icon>mdi-near-me</v-icon>{{ totalAmount }}
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col 
              v-for="(alarm, idx) in alarmsAmountPerMachine"
              :key="idx"
              cols="12"
              md="6"
            >
              <alarm-per-machine-card 
                :name="alarm.name"
                :amount="parseInt(alarm.amount)"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import DateRangePicker from '../../components/dashboard/DateRangePicker'
import AlarmPerMachineCard from '../../components/alarms/AlarmPerMachineCard'

export default {
  components: {
    DateRangePicker,
    AlarmPerMachineCard
  },
  props: {
    title: {
      type: String,
      default: () => ('')
    },
    alarmsAmountPerMachine: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    totalAmount() {
      let val = 0

      this.alarmsAmountPerMachine.forEach((alarm) => {
        val += parseInt(alarm.amount)
      })

      return val
    }
  },
  methods: {
    handleDateRangeSelected (dates) {
      this.$emit('onDateRangeSelected', this.title, dates)
    }
  }
}
</script>
