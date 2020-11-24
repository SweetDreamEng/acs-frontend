<template>
  <div class="my-2">
    <div>
      <v-card>
        <v-card-title>Basic Information</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div>
              <v-avatar
                v-if="user.name"
                color="primary"
                size="68"
              >
                <span class="white--text headline">{{ user.name | initials }}</span>
              </v-avatar>
            </div>
            <v-form
              ref="form"
              v-model="isFormValid"
              lazy-validation
              class="flex-grow-1 pt-2 pa-sm-2"
              @submit.prevent="save"
            >
              <v-text-field
                v-model="user.name"
                label="Display name"
                placeholder="name"
                :rules="[rules.required]"
                outlined
                dense
              >
              </v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                placeholder="Email"
                :rules="[rules.required, rules.emailFormat]"
                outlined
                dense
              >
              </v-text-field>
              <v-select
                :items="roles"
                v-model="user.role"
                label="Role"
                placeholder="Role"
                item-value="id"
                item-text="name"
                :rules="[rules.required]"
                outlined
                dense
              >
              </v-select>
              
              <div
                v-for="(location, i) in locations"
                :key="i"
              >
                <v-checkbox
                  v-model="selectedLocations"
                  :value="location.id"
                  :label="location.location"
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
                <div
                  v-if="selectedLocations.includes(location.id)"
                  class="d-flex flex-wrap px-2"
                >
                  <v-checkbox
                    v-for="(zone, j) in zonesOfLocation(location.id)"
                    :key="j"
                    v-model="selectedZones"
                    :value="zone.id"
                    :label="zone.name"
                    class="shrink mr-2 mt-0"
                  ></v-checkbox>
                </div>
              </div>

              <v-btn
                color="primary"
                @click="save"
                :loading="button_loading"
                :disabled="button_loading"
              >Save</v-btn>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  props: {
    button_loading: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: () => []
    },
    locations: {
      type: Array,
      default: () => []
    },
    zones: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      panel: [1],
      isFormValid: true,

      user: {
        name: '',
        email: '',
        role: ''
      },

      selectedLocations: [],
      selectedZones: [],

      rules: {
        required: (value) => (value && Boolean(value)) || 'Required',
        emailFormat: (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      }
    }
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const data = {
          name: this.user.name,
          email: this.user.email,
          role: this.user.role,
          locations: this.selectedLocations,
          zones: this.selectedZones
        }

        this.$emit('submit', data)
      }
    },
    zonesOfLocation(location_id) {
      return this.zones.filter((zone) => zone.location_id === location_id)
    }
  }
}
</script>
