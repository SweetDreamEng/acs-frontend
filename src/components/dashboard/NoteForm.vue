<template>
  <v-card>
    <v-card-title>
      <span class="primary--text">Add a note</span>
    </v-card-title>
    <v-card-text>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit="addNote"
        >
          <v-textarea
            v-model="note"
            label="Note"
            outlined
            required
            :rules="noteRules"
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="grey"
            class="mr-4"
            @click="handleResetNote"
          >
            <v-icon dark>
              $mdi-minus
            </v-icon>
            Reset
          </v-btn>
          <v-btn
            color="primary"
            class="mr-4"
            :loading="isLoading"
            :disabled="isLoading"
            @click="_addNote"
          >
            <v-icon dark>
              $mdi-plus
            </v-icon>
            Add
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    deviceId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      valid: true,
      note: '',
      noteRules: []
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.notes.isNoteAdding
    })
  },
  watch: {
    'note' (val) {
      this.noteRules = []
    }
  },
  methods: {
    ...mapActions({
      addNote: 'notes/addNote',
      getNotes: 'notes/getNotes'
    }),
    handleResetNote() {
      this.note = ''

      this.$refs.form.resetValidation()
    },
    _addNote() {
      this.noteRules = [(v) => !!v || 'Field is required']

      setTimeout(async () => {
        if (this.$refs.form.validate()) {
          try {
            await this.addNote({
              deviceId: this.deviceId,
              note: this.note
            })

            this.note = ''
            this.$refs.form.resetValidation()

            await this.getNotes(this.deviceId)
          } catch (error) {
            console.log(error)
          }
        }
      })
    }
  }
}
</script>