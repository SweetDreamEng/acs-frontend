<template>
  <v-dialog :value="dlg" width="600" persistent>
    <v-card>
      <v-card-title class="primary white--text">Select Options</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="locSelectedTags"
          chips
          dense
          multiple
          rounded
          small-chips
          solo
          :items="tags"
          placeholder="Tags"
          item-text="name"
          item-value="id"
          :return-object="true"
          class="my-2"
        ></v-autocomplete>
        <v-row>
          <v-col cols="5">
            <v-radio-group
              v-model="locTimeRangeOption"
            >
              <v-radio
                v-for="(item, i) in timeRageOptions"
                :key="i"
                :label="item.label"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="7">
            <v-date-picker
              id="picker2"
              v-model="dates"
              range
              :disabled="locTimeRangeOption!=='custom'"
              class="mt-6"
            ></v-date-picker>
          </v-col>
        </v-row>
        <div class="text-right">
          <v-btn color="primary" text @click="$emit('close')">Cancel</v-btn>
          <v-btn color="primary" @click="apply">Apply</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

const dateTimeIsoString = new Date().toISOString().substr(0, 10)

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
          dates: []
        }
      }
    },
    selectedTags: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      locTimeRangeOption: this.timeRange.timeRangeOption,
      dates: this.timeRange.dates,
      locSelectedTags: this.selectedTags
    }
  },
  computed: {
    ...mapState('machines', ['timeRageOptions']),
    ...mapGetters('machines', ['timeRangeFromTo'])
  },
  watch: {
    selectedTags(newValue) {
      this.locSelectedTags = newValue
    },
    timeRange (newValue) {
      this.locTimeRangeOption = newValue.timeRangeOption
    },
    locTimeRangeOption (newValue) {
      if (newValue !== 'custom') {
        const tR = {
          timeRangeOption: newValue,
          dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
        }

        this.dates = [
          new Date(this.timeRangeFromTo(tR).from).toISOString().substr(0, 10),
          new Date(this.timeRangeFromTo(tR).to).toISOString().substr(0, 10)
        ]
      }
    }
  },
  methods: {
    dlgBtnClicked() {
      this.$emit('close')
    },
    apply() {
      this.$emit('submit', {
        timeRange: {
          timeRangeOption: this.locTimeRangeOption,
          dates: this.dates
        },
        selectedTags: this.locSelectedTags
      })
    }
  }
}
</script>
<style>
  #picker2 .v-picker__title {
    display: none
  }
</style>