<template>
  <div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="flex-grow-1 pt-2 pa-sm-2">
        <v-form ref="accountForm" v-model="isAccountValidForm" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="userData.user.email"
            :rules="[$rules.required]"
            label="Email"
            outlined
            dense
            type="email"
            @input="resetErrors"
          ></v-text-field>
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="userData.user.username"
                :rules="[$rules.required]"
                label="Full name"
                outlined
                dense
                @input="resetErrors"
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="userData.phone"
                :rules="[$rules.required]"
                label="Phone"
                outlined
                :loading="loading"
                dense
                @input="resetErrors"
              ></v-text-field>
            </v-col>
          </v-row>
          <error-component :error="error"></error-component>

          <div class="mt-2">
            <v-btn type="submit" color="primary" :loading="isBtnLoading">Save</v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ErrorComponent from '../common/ErrorComponent'
export default {
  components: {
    ErrorComponent
  },
  props: {
    isBtnLoading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: () => ({})
    },
    profile:{
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isAccountValidForm: true,
      userData:{
        user: this.user,
        phone: ''
      }
    }
  },
  computed: {
    loading() {
      return !this.profile.profile
    }
  },
  watch: {
    profile(data) {
      this.userData.phone = data.profile.phone
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'auth/updateProfile'
    }),
    submit() {
      if (this.$refs.accountForm.validate()) {
        this.updateProfile({
          name:this.userData.user.username,
          email:this.userData.user.email,
          phone:this.userData.phone
        })
      }
    },
    resetErrors() {
      this.$emit('clearError')
    }
  }
}
</script>
