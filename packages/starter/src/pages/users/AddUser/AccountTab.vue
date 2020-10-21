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
                <span class="white--text headline">{{ initializedName(user.name) }}</span>
              </v-avatar>
            </div>
            <div class="flex-grow-1 pt-2 pa-sm-2">
              <v-text-field v-model="user.name" label="Display name" placeholder="name"></v-text-field>
              <v-text-field v-model="user.email" label="Email" hide-details></v-text-field>

              <div class="mt-2">
                <v-btn color="primary" @click>Save</v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
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
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      panel: [1],
      deleteDialog: false,
      disableDialog: false
    }
  },
  methods: {
    initializedName(username) {
      const name = 'Foo Bar 1Name too Long'
      const initials = username.match(/\b\w/g) || []

      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }
  }
}
</script>
