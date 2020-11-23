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
              
              <location-select :locations="locations" :zones="zones"></location-select>

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

import LocationSelect from './LocationSelect'

export default {
  components: {
    LocationSelect
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

      rules: {
        required: (value) => (value && Boolean(value)) || 'Required',
        emailFormat: (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      }
    }
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', this.user)
      }
    }
  }
}
</script>
