<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Companies</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn v-if="canCreateCompanies" color="primary" to="/companies/add">
        <v-icon left>$mdi-plus</v-icon>
        Create Company
      </v-btn>
    </div>

    <v-card>
      <v-row dense class="pa-2 align-center" justify="end">
        <v-col sm="12" md="6" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="$mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="e.g. filter for company name, administrator name, etc"
          ></v-text-field>
          <v-btn
            icon
            small
            class="ml-2"
            @click="getCompanyAdmins"
          >
            <v-icon>$mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="companyAdmins"
        :search="searchQuery"
        class="flex-grow-1"
        hide-default-footer
        :loading="isTableLoading"
      >
        <template v-slot:item.created_at="{ item }">
          <div>{{ item.created_at | formatDate('yyyy-MM-dd') }}</div>
        </template>
        <template v-slot:item.action="{ item }">
          <div v-if="canCreateCompanies" class="actions">
            <v-btn icon :to="`/companies/edit/${item.id}`">
              <v-icon small>$mdi-pencil</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Companies List Page Component
| url: /companies
|---------------------------------------------------------------------
|
| List all companies and company add/edit options
*/
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Companies',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      searchQuery: '',
      headers: [
        { text: 'Company Name', value: 'companyName' },
        { text: 'Administrator Name', value: 'administratorName' },
        { text: 'Created At', value: 'created_at' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      companyAdmins: (state) => state.companies.companyAdmins,
      isTableLoading: (state) => state.companies.isTableLoading
    }),
    ...mapGetters({
      canCreateCompanies: 'auth/canCreateCompanies'
    })
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      getCompanyAdmins: 'companies/getCompanyAdmins'
    }),
    open() {
      this.getCompanyAdmins()
    }
  }
}
</script>
