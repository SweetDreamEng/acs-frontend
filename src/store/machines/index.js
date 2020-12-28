import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  machines: [],
  selectedId: 0,

  selectedCompany: null,
  
  // utilization
  loadingUtilization: false,
  utilizationSeries: [],

  // Energy Consumption
  loadingEnergyConsumption: false,
  energyConsumption: [],
  
  // Machine overview
  loadingOverview: false,
  machine: {},

  actualValuesBar: [],
  targetValuesBar: [],
  outletValuesBar: [],

  // Machine overview
  loadingInventories: false,
  inventories: [],

  // Product Weight
  loadingWeight: false,
  actualWeights: [],
  targetWeights: [],

  loadingRecipe: false,
  recipeValues: [],

  // Accumeter Ovation Continuous Blender
  actualRecipe2Values: [],
  targetRecipe2Values: [],

  systemStates: {},
  loadingSystemStates: false,

  // Feeder stables in machine type 2
  feederStables: [],
  loadingFeederStables2: false,

  // Production rate in machine type 2
  processRateSeries: [],
  loadingProcessRate: false,

  loadingActualTargetBar: false,

  // Running hours per weekday
  loadingWeeklyRunningHours1: false,
  weeklyRuningHours: [],

  // Locations table series
  loadingLocationsTable: false,
  downtimeDistribution: [],

  // Zones table
  loadingZonesTable: false,

  loadingMachinesTable: false,

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

  processRateTimeRange: {
    timeRangeOption: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00'
  },

  hauloffTimeRange: {
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

  // GH Gravimetric Extrusion Control Hopper
  loadingHopperInventories: false,
  hopperInventories: [],

  loadingHauloffLengths: false,
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
