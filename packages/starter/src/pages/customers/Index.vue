<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Customers</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/customers/add">
        Create Customer
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="customers"
        :search="searchQuery"
        class="flex-grow-1"
      >
        <template v-slot:item.id="{ item }">
          <div># {{ item.id }}</div>
        </template>
        <template v-slot:item.created_at="{ item }">
          <div>{{ item.created_at | formatDate('ll') }}</div>
        </template>

<!--         <template v-slot:item.lastSignIn="{ item }">
          <div>{{ item.lastSignIn | formatDate('lll') }}</div>
        </template> -->

        <template v-slot:item.action="{ item }">
          <div class="actions">
            <v-btn icon :to="editLink(item)">
              <v-icon>mdi-open-in-new</v-icon>
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
| Customers List Page Component
| url: /customers/list
|---------------------------------------------------------------------
|
| List all customers and customer add/edit options
*/
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      isLoading: false,
      breadcrumbs: [{
        text: 'Customers',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      searchQuery: '',
      headers: [
        { text: 'Id', align: 'left', value: 'id' },
        { text: 'Customer Name', value: 'name' },
        { text: 'Administrator Name', value: 'administratorName' },
        { text: 'Created At', value: 'created_at' },
        // { text: 'Last SignIn', value: 'lastSignIn' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      customers: (state) => state.customers.data
    })
  },
  watch: {
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      getCustomers: 'customers/getCustomers'
    }),
    open() {
      this.getCustomers()
    },
    editLink(item) {
      return '/customers/edit/' + item.id
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
