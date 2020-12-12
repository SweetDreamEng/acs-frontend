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
        label="Date range"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dates"
      range
      @input="datePicker = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      dates: ['2020-01-01', new Date().toISOString().substr(0, 10)],
      datePicker: false
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  }
}
</script>

<style>

</style>
