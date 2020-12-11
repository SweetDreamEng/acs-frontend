import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
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

  // product note
  isNoteAdding: false,
  notes: [],

  // utilization
  loadingUtilization: false,
  utilizationSeries: [],

  // Energy Consumption
  loadingEnergyConsumption: false,
  energyConsumption: [],
  
  // Machine overview
  loadingOverview: false,
  machine: {},

  // Running hours per weekday
  loadingWeeklyRunningHours1: false,
  weeklyRuningHours: [],

  // Locations table series
  loadingLocationsTable: false,
  downtimeDistribution: [],

  modeWeightProduct: 'Weekly',
  modeInventory: 'Weekly',

  timeRageOptions: [
    {
      label: 'Last 30 minutes',
      value: 'last30Min'
    },
    {
      label: 'Last hour',
      value: 'lastHour'
    },
    {
      label: 'Last 4 hours',
      value: 'last4Hours'
    },
    {
      label: 'Last 12 hours',
      value: 'last12Hours'
    },
    {
      label: 'Last 24 hours',
      value: 'last24Hours'
    },
    {
      label: 'Last 48 hours',
      value: 'last48Hours'
    },
    {
      label: 'Last 3 days',
      value: 'last3Days'
    },
    {
      label: 'Last 7 days',
      value: 'last7Days'
    },
    {
      label: 'Last 24 days',
      value: 'last24Days'
    },
    {
      label: 'Custom',
      value: 'custom'
    }
  ],

  utilizationTimeRange: {
    timeRangeOption: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00'
  },

  energyConsumptionTimeRange: {
    timeRangeOption: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00'
  },

  inventoryTimeRange: {
    timeRangeOption: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00'
  },

  paramWeightProduct: 0,
  paramInventory: 0,

  weightTimeRange: {
    timeRangeOption: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00'
  },

  selectedTimeRangeKey: 'inventory',

  valuesTgtWeightProduct: [],
  valuesActWeightProduct: [],
  valuesHopInventory: [],
  valuesFrtInventory: [],

  // BD Batch Blender
  totalRunningPercentage: 0,
  recipeValues: [],

  // GH Gravimetric Extrusion Control Hopper
  hopperInventories: [],
  hauloffLengths: [],
  recipeSetPoints: [],
  recipeActualPoints: [],

  isWeightProductLoading: false,
  isInventoryProductLoading: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
