import machineAPI from '@/services/api/machine'

const module = {
  namespaced: true,
  state: {
    data: [
      {
        id: 1,
        customerId: 3,
        parameters: [],
        status: 'Warning',
        machinename: 'BD Batch Blender',
        capacity: 89,
        consumption: '80 Watts',
        factory: '30 Elm Street, NY',
        department: {
          id: 1,
          name: 'Zone 1'
        },
        location: {
          id: 1,
          name: 'Location 1'
        },
        notes: []
      },
      {
        id: 2,
        customerId: 3,
        parameters: [],
        status: 'Normal',
        machinename: 'Accumeter Ovation Continuous',
        capacity: 30,
        consumption: '30 Watts',
        factory: '45 Main street, FL',
        department: {
          id: 2,
          name: 'Zone 2'
        },
        location: {
          id: 2,
          name: 'Location 2'
        },
        notes: []
      },
      {
        id: 3,
        customerId: 3,
        parameters: [],
        status: 'Normal',
        machinename: 'GH Gravimetric Extrusion Control',
        capacity: 57,
        consumption: '20 Watts',
        factory: '50 Gracy Street, TX',
        department: {
          id: 3,
          name: 'Zone 3'
        },
        location: {
          id: 3,
          name: 'Location 3'
        },
        notes: []
      },
      {
        id: 4,
        customerId: 3,
        parameters: [],
        status: 'Alarm',
        machinename: 'GH-F Gravimetric Additive',
        capacity: 99,
        consumption: '90 Watts',
        factory: '44 Main Street, GA',
        department: {
          id: 2,
          name: 'Zone 2'
        },
        location: {
          id: 3,
          name: 'Location 3'
        },
        notes: []
      },
      {
        id: 5,
        customerId: 2,
        parameters: [],
        status: 'Normal',
        machinename: 'VTC Plus Conveying',
        capacity: 32,
        consumption: '10 Watts',
        factory: '33 One Drive, MA',
        department: {
          id: 1,
          name: 'Zone 1'
        },
        location: {
          id: 1,
          name: 'Location 1'
        },
        notes: []
      },
      {
        id: 6,
        customerId: 2,
        parameters: [],
        status: 'Normal',
        machinename: 'NGX',
        capacity: 27,
        consumption: '10 Watts',
        factory: '29 Georgia Ave, CA',
        department: {
          id: 1,
          name: 'Zone 1'
        },
        location: {
          id: 1,
          name: 'Location 1'
        },
        notes: []
      },
      {
        id: 7,
        customerId: 2,
        parameters: [],
        status: 'Normal',
        machinename: 'NGX Nomad',
        capacity: 38,
        consumption: '40 Watts',
        factory: '746 Macon, CO',
        department: {
          id: 3,
          name: 'Zone 3'
        },
        location: {
          id: 3,
          name: 'Location 3'
        },
        notes: []
      },
      {
        id: 8,
        customerId: 1,
        parameters: [],
        status: 'Warning',
        machinename: 'Truetemp',
        capacity: 74,
        consumption: '20 Watts',
        factory: '1 Cantance Street, UT',
        department: {
          id: 1,
          name: 'Zone 1'
        },
        location: {
          id: 1,
          name: 'Location 1'
        },
        notes: []
      },
      {
        id: 9,
        customerId: 1,
        parameters: [],
        status: 'Not',
        machinename: 'GP & HE Central',
        capacity: '',
        consumption: 'OFF',
        factory: '45 Spring Street, NY',
        department: {
          id: 3,
          name: 'Zone 3'
        },
        location: {
          id: 2,
          name: 'Location 2'
        },
        notes: []
      },
      {
        id: 10,
        customerId: 1,
        parameters: [],
        status: 'Normal',
        machinename: 'T50 Central',
        capacity: '52',
        consumption: '30 Watts',
        factory: '69 Borden Rd, IL',
        department: {
          id: 2,
          name: 'Zone 2'
        },
        location: {
          id: 3,
          name: 'Location 3'
        },
        notes: []
      }
    ],
    machines: [],
    selectedId: 0,

    selectedCompany: null,

    modeWeightProduct: 'Weekly',
    modeInventory: 'Weekly',

    paramWeightProduct: 0,
    paramInventory: 0,

    weightTimeRange: {
      timeRange: 'last24Hours',
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      timeFrom: '00:00',
      timeTo: '00:00'
    },
    valuesTgtWeightProduct: [],
    valuesActWeightProduct: [],
    valuesHopInventory: [],
    valuesFrtInventory: [],

    isWeightProductLoading: false,
    isInventoryProductLoading: false
  },

  actions: {
    selectMachine({
      commit
    }, id) {
      commit('selectData', id)
    },
    updateSelections({
      commit
    }, selections) {
      commit('updateSelections', selections)
    },
    addProductNote({
      commit
    }, note) {
      commit('addProductNote', note)
    },
    initAcsDashboard({
      commit, state
    }) {
      machineAPI.initAcsDashboard()
        .then((response) => {
          commit('customers/SET_COMPANIES', response.data.companies, { root: true })
          if (!state.selectedCompany)
            commit('SET_SELECTED_COMPANY', response.data.companies[0])
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
        })
    },
    changeSelectedCompany({
      commit
    }, company) {
      commit('SET_SELECTED_COMPANY', company)
    },

    // product analytics init
    initProductAnalytics({
      commit, state
    }) {
      commit('WEIGHT_PRODUCT_LOADING')
      commit('INVENTORY_PRODUCT_LOADING')
      machineAPI.initProductAnalytics({
        mode: state.modeWeightProduct,
        param: state.paramWeightProduct
      })
        .then((response) => {
          commit('SET_TGT_WEIGHT_VALUES', response.data.targets)
          commit('SET_ACT_WEIGHT_VALUES', response.data.actuals)
          commit('SET_HOP_INVENTORY_VALUES', response.data.hops)
          commit('SET_FRT_INVENTORY_VALUES', response.data.fractions)
          commit('alarms/SET_ALARM_TYPES', response.data.alarm_types, { root: true })
          commit('alarms/SET_ALARMS', response.data.alarms, { root: true })
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          commit('WEIGHT_PRODUCT_LOADED')
          commit('INVENTORY_PRODUCT_LOADED')
        })
    },

    onProductWeightParamChange({
      commit
    }, data) {
      commit('WEIGHT_PRODUCT_LOADING')
      machineAPI.changeProductWeightMode(data)
        .then((response) => {
          commit('SET_TGT_WEIGHT_VALUES', response.data.targets)
          commit('SET_ACT_WEIGHT_VALUES', response.data.actuals)
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          commit('WEIGHT_PRODUCT_LOADED')
          commit('SET_PRODUCT_WEIGHT_MODE', data.mode)
          commit('SET_PRODUCT_WEIGHT_PARAM', data.param)
        })
    },

    onProductInventoryParamChanged({
      commit
    }, data) {
      commit('INVENTORY_PRODUCT_LOADING')
      machineAPI.onProductInventoryParamChanged(data)
        .then((response) => {
          commit('SET_HOP_INVENTORY_VALUES', response.data.hops)
          commit('SET_FRT_INVENTORY_VALUES', response.data.fractions)
        })
        .catch((error) => {
          console.log(error.response)
        })
        .finally(() => {
          commit('INVENTORY_PRODUCT_LOADED')
          commit('SET_PRODUCT_INVENTORY_MODE', data.mode)
          commit('SET_PRODUCT_INVENTORY_PARAM', data.param)
        })
    }
  },

  mutations: {
    selectData: (state, id) => {
      state.selectedId = parseInt(id)
    },
    updateSelections: (state, selections) => {
      state.data.forEach( (_data) => {
        if (_data.id === state.selectedId) {
          _data.selections = selections
        }
      })
    },
    addProductNote: (state, note) => {
      state.data.forEach( (_data) => {
        if (_data.id === state.selectedId) {
          const currentTime = new Date()

          _data.notes.push({
            text: note,
            time: currentTime
          })
        }
      })
    },
    SET_MACHINES(state, machines) {
      state.machines = machines
    },
    SET_SELECTED_COMPANY(state, company) {
      state.selectedCompany = company
    },

    // set target values
    SET_TGT_WEIGHT_VALUES(state, tgt) {
      state.valuesTgtWeightProduct = tgt
    },
    // set actual values
    SET_ACT_WEIGHT_VALUES(state, act) {
      state.valuesActWeightProduct = act
    },
    SET_HOP_INVENTORY_VALUES(state, hops) {
      state.valuesHopInventory = hops
    },
    SET_FRT_INVENTORY_VALUES(state, fractions) {
      state.valuesFrtInventory = fractions
    },

    // Target and Actuals mode - Weekly or Monthly
    SET_PRODUCT_WEIGHT_MODE(state, mode) {
      state.modeWeightProduct = mode
    },
    // Target and Actuals mode - Weekly or Monthly
    SET_PRODUCT_INVENTORY_MODE(state, mode) {
      state.modeInventory = mode
    },

    // Target and Actuals mode - Weekly or Monthly
    SET_PRODUCT_WEIGHT_PARAM(state, param) {
      state.paramWeightProduct = param
    },
    SET_PRODUCT_INVENTORY_PARAM(state, param) {
      state.paramInventory = param
    },

    WEIGHT_PRODUCT_LOADING(state) {
      state.isWeightProductLoading = true
    },
    WEIGHT_PRODUCT_LOADED(state) {
      state.isWeightProductLoading = false
    },
    INVENTORY_PRODUCT_LOADING(state) {
      state.isInventoryProductLoading = true
    },
    INVENTORY_PRODUCT_LOADED(state) {
      state.isInventoryProductLoading = false
    }
  },

  getters: {
    selectedMachine: (state) => {
      if (state.selectedId) {
        const _machine = state.data.find((machine) => machine.id === state.selectedId)

        return _machine
      }

      return {}
    },
    extendedMachines: (state) => {
      const _machines = state.machines

      _machines.unshift({
        id: 0,
        name: 'Not Assigned'
      })

      return _machines
    }
  }
}

export default module
