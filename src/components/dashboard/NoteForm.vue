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
        >
          <v-textarea
            v-model="note"
            label="Note"
            outlined
            required
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="grey"
            class="mr-4"
            @click="clearNote"
          >
            <v-icon dark>
              mdi-minus
            </v-icon>
            Reset
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="addNote"
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
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      valid: true,
      note: ''
    }
  },
  methods: {
    ...mapActions([
      'addProductNote'
    ]),
    addNote() {
      this.addProductNote(this.note)
      this.note = ''
    },
    clearNote() {
      this.note = ''
    }
  }
}
</script>