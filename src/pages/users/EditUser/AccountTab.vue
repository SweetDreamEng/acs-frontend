<template>
  <div class="my-2">
    <div>
      <v-card v-if="user.disabled" class="warning mb-4" light>
        <v-card-title>User Disabled</v-card-title>
        <v-card-subtitle>This user has been disabled! Login accesss has been revoked.</v-card-subtitle>
        <v-card-text>
          <v-btn dark @click="user.disabled = false">
            <v-icon left small>mdi-account-check</v-icon>Enable User
          </v-btn>
        </v-card-text>
      </v-card>

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
                :rules="[rules.required]"
                placeholder="name"
                outlined
                dense
              >
              </v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                :rules="[rules.required, rules.emailFormat]"
                placeholder="Email"
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

      <v-expansion-panels v-model="panel" multiple class="mt-3">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Actions</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mb-2">
              <div class="title">Reset User Password</div>
              <div class="subtitle mb-2">Sends a reset password email to the user.</div>
              <v-btn
                class="mb-2"
                @click
              >
                <v-icon left small>mdi-email</v-icon>Send Reset Password Email
              </v-btn>
            </div>

            <v-divider></v-divider>

            <div class="my-2">
              <div class="error--text title">Danger Zone</div>
              <div class="subtitle mb-2">Full administrator with access to this dashboard.</div>

              <div class="my-2">
                <v-btn
                  v-if="user.role === 'ADMIN'"
                  color="primary"
                  @click="user.role = 'USER'"
                >
                  <v-icon left small>mdi-security</v-icon>Remove admin access
                </v-btn>
                <v-btn v-else color="primary" @click="user.role = 'ADMIN'">
                  <v-icon left small>mdi-security</v-icon>Set User as Admin
                </v-btn>
              </div>

              <v-divider></v-divider>

              <div class="subtitle mt-3 mb-2">Prevent the user from signing in on the platform.</div>
              <div class="my-2">
                <v-btn
                  v-if="user.disabled"
                  color="warning"
                  @click="user.disabled = false"
                >
                  <v-icon left small>mdi-account-check</v-icon>Enable User
                </v-btn>
                <v-btn
                  v-else
                  color="warning"
                  @click="disableDialog = true"
                >
                  <v-icon left small>mdi-cancel</v-icon>Disable User
                </v-btn>
              </div>

              <v-divider></v-divider>
              <div
                class="subtitle mt-3 mb-2"
              >To delete the user please transfer ownership or delete user's subscriptions.</div>
              <v-btn color="error" @click="deleteDialog = true">
                <v-icon left small>mdi-delete</v-icon>Delete User
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Metadata</v-expansion-panel-header>
          <v-expansion-panel-content class="body-2">
            <span class="font-weight-bold">Created</span>
            {{ user.created | formatDate('lll') }}
            <br />
            <span class="font-weight-bold">Last Sign In</span>
            {{ user.lastSignIn | formatDate('lll') }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- disable modal -->
    <v-dialog v-model="disableDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Disable User</v-card-title>
        <v-card-text>Are you sure you want to disable this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="disableDialog = false">Cancel</v-btn>
          <v-btn color="warning" @click="user.disabled = true; disableDialog = false">Disable</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete modal -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="deleteDialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    button_loading: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
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
      deleteDialog: false,
      disableDialog: false,

      isFormValid: true,

      selectedLocations: this.user.selected_locations,
      selectedZones: this.user.selected_zones,

      rules: {
        required: (value) => (value && Boolean(value)) || 'Required',
        emailFormat: (v) => /.+@.+\..+/.test(v) || 'Email must be valid'
      }
    }
  },
  watch: {
    user: function (newUser, oldUser) {
      this.selectedLocations = newUser.selected_locations
      this.selectedZones = newUser.selected_zones
    }
  },
  mounted() {
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const data = {
          id: this.user.id,
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
