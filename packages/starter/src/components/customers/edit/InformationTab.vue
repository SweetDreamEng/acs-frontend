<template>
  <div>
    <v-card class="my-2">
      <v-card-title>Account Information</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field value="" label="Address Line 1"></v-text-field>
              <v-text-field value="" label="Address Line 2"></v-text-field>
              <v-text-field value="" label="Zip Code"></v-text-field>
              <v-text-field value="" label="City"></v-text-field>
              <v-text-field value="" label="State"></v-text-field>
              <v-text-field value="" label="Country"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                value=""
                label="Phone"
                placeholder="123-456-7890"
                :rules="phoneRules"
                >
                </v-text-field>
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
  </div>
</template>

<script>
export default {
  data: () => ({
    customer: {
    },

    phoneRules: [
      (v) => !!v || 'Phone number is required',
      (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
    ]
  }),
  watch: {
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>