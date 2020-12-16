<template>
  <v-menu
    v-model="datePicker"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateRangeText"
        label="Select Date Range"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dates"
      range
      @input="submit()"
    >
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      dates: [],
      datePicker: false
    }
  },
  computed: {
    dateRangeText () {            
      return this.dates.join(' ~ ')
    }
  },
  methods: {
    submit() {
      this.datePicker = this.dates.length !== 2

      if (this.dates.length === 2) {
        this.$emit('onDateRangeSelected', this.dates)
      }
    }
  }
}
</script>