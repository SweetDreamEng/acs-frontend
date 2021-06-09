<template>
  <v-dialog :value="dlg" width="400" persistent>
    <v-card>
      <v-card-title class="primary white--text">Set Plan Time</v-card-title>
      <v-card-text>
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
                label="Date"
                prepend-icon="$mdi-calendar"
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
        </div>

        <div>
          <v-text-field
            v-model="planTime"
            :rules="[$rules.required]"
            label="Plan Time"
            dense
            outlined
            type="number"
          ></v-text-field>
        </div>

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

const dateTimeIsoString = new Date().toISOString().substr(0, 10)

export default {
  props: {
    dlg: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dateFromMenu: false,
      timeFromMenu: false,
      dateToMenu: false,
      timeToMenu: false,
      locDateFrom: dateTimeIsoString,
      planTime: 0
    }
  },
  computed: {
  },
  watch: {
    timeRange (newValue) {
      this.locDateFrom = newValue.dateFrom
    }
  },
  methods: {
    dlgBtnClicked() {
      this.$emit('close')
    },
    apply() {
      this.$emit('submit', {
        dateFrom: this.locDateFrom,
        planTime: this.planTime
      })
    }
  }
}
</script>
