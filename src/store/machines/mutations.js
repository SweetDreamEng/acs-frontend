export default {
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

  OVERVIEW_LOADING(state) { state.loadingOverview = true },
  OVERVIEW_LOADED(state) { state.loadingOverview = false },
  SET_OVERVIEW(state, overview) { state.machine = overview },

  SET_UTILIZATION(state, utilization) { state.utilizationSeries = utilization },
  SET_INVENTORIES(state, inventories) { state.inventories = inventories },
  SET_ACTUAL_WEIGHTS(state, actualWeights) { state.actualWeights = actualWeights },
  SET_TARGET_WEIGHTS(state, targetWeights) { state.targetWeights = targetWeights },

  SET_WEEKLY_RUNNING_HOURS(state, hours) { state.weeklyRuningHours = hours },

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

  INVENTORY_PRODUCT_LOADING(state) {
    state.isInventoryProductLoading = true
  },
  INVENTORY_PRODUCT_LOADED(state) {
    state.isInventoryProductLoading = false
  },

  // BD Batch Blender
  SET_RUNNING_PERCENTAGE(state, totalRunningPercentage) { state.totalRunningPercentage = totalRunningPercentage },
  SET_RECIPE_VALUES(state, recipeValues) { state.recipeValues = recipeValues },

  // GH Gravimetric Extrusion Control Hopper
  SET_HOPPER_INVENTORIES(state, hopperInventories) { state.hopperInventories = hopperInventories },
  SET_HAULOFF_LENGTHS(state, hauloffLengths) { state.hauloffLengths = hauloffLengths },
  SET_RECIPE_ACTUAL_POINTS(state, actualPoints) { state.recipeActualPoints = actualPoints },
  SET_RECIPE_SET_POINTS(state, setPoints) { state.recipeSetPoints = setPoints },

  SET_CURRENT_TIME_RANGE_ITEM(state, key) {
    if (key === 'inventory') {
      state.selectedTimeRange = state.inventoryTimeRange
    } else if (key === 'weight') {
      state.selectedTimeRange = state.weightTimeRange
    } else if (key === 'utilization') {
      state.selectedTimeRange = state.utilizationTimeRange
    } else if (key === 'process-rate') {
      state.selectedTimeRange = state.processRateTimeRange
    }
  },
  SET_CURRENT_TIME_PARAM_KEY(state, key) { state.selectedTimeRangeKey = key },
  SET_INVENTORY_TIME_RANGE(state, data) { state.inventoryTimeRange = Object.assign({}, data) },
  SET_WEIGHT_TIME_RANGE(state, data) { state.weightTimeRange = Object.assign({}, data) },
  SET_UTILIZATION_TIME_RANGE(state, data) { state.utilizationTimeRange = Object.assign({}, data) },
  SET_ENERGY_CONSUMPTION_TIME_RANGE(state, data) { state.energyConsumptionTimeRange = Object.assign({}, data) },
  SET_PROCESS_RATE_TIME_RANGE(state, data) { state.processRateTimeRange = Object.assign({}, data) },
  
  // Energy Consumption
  SET_ENERGY_CONSUMPTION(state, energyConsumption) { state.energyConsumption = energyConsumption },
  SET_DOWNTIME_DISTRIBUTION(state, data) { state.downtimeDistribution = data }
}