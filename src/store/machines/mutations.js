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
  addNote: (state, note) => {
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

  OVERVIEW_LOADING(state) { state.loadingOverview = true },
  OVERVIEW_LOADED(state) { state.loadingOverview = false },
  SET_OVERVIEW(state, overview) { state.machine = overview },

  SET_WEEKLY_RUNNING_HOURS(state, hours) { state.weeklyRuningHours = hours },

  SET_MACHINES(state, machines) {
    state.machines = machines
  },
  SET_SELECTED_COMPANY(state, company) {
    state.selectedCompany = company
  },

  // Set machine notes
  SET_NOTES(state, notes) {
    state.notes = notes
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
  },

  // Energy Consumption
  SET_ENERGY_CONSUMPTION(state, energyConsumption) { state.energyConsumption = energyConsumption },

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
    }
  },
  SET_CURRENT_TIME_PARAM_KEY(state, key) { state.selectedTimeRangeKey = key },
  SET_INVENTORY_TIME_RANGE(state, data) { state.inventoryTimeRange = Object.assign({}, data) },
  SET_WEIGHT_TIME_RANGE(state, data) { state.weightTimeRange = Object.assign({}, data) },

  SET_DOWNTIME_DISTRIBUTION(state, data) { state.downtimeDistribution = data }
}