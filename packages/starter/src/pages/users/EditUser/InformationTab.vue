<template>
  <v-card class="my-2">
    <v-card-title>User Information</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field value="First and two on el street" label="Address Line 1"></v-text-field>
            <v-text-field value="" label="Address Line 2"></v-text-field>
            <v-text-field value="1231" label="Zip Code"></v-text-field>
            <v-text-field value="Los Angeles" label="City"></v-text-field>
            <v-text-field value="California" label="State"></v-text-field>
            <v-text-field value="United States" label="Country"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              value="848-454-8112"
              label="Phone"
              :rules="phoneRules"
              >
              </v-text-field>
            <v-select
              :items="departments"
              value="Department2"
              label="Department"
            ></v-select>
            <v-select
              :items="divisions"
              value="Division3"
              label="Division"
            >
            </v-select>
          </v-col>
        </v-row>

        <div class="d-flex">
          <v-btn>Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary">Save</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    date: '1990-10-09',
    menu: false,
    gender: 'male',

    departments: ['Department1', 'Department2', 'Department3'],
    divisions: ['Division1', 'Division2', 'Division3', 'Division4'],

    phoneRules: [
      (v) => !!v || 'Phone number is required',
      (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
    ]
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>