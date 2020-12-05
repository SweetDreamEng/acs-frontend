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
            :rules="[$rules.required]"
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="grey"
            class="mr-4"
            @click="note = ''"
          >
            <v-icon dark>
              mdi-minus
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
              mdi-plus
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
    machineId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      valid: true,
      note: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.machines.isNoteAdding
    })
  },
  methods: {
    ...mapActions({
      addNote: 'machines/addNote'
    }),
    _addNote() {
      if (this.$refs.form.validate()) {
        this.addNote({
          machineId: this.machineId,
          note: this.note
        })
          .then(() => {
            this.note = ''
            this.$refs.form.resetValidation()
          })
      }
    }
  }
}
</script>