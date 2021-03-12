export default {
  SET_WEEKLY_RUNNING_HOURS(state, hours) { state.weeklyRuningHours = hours },

  SET_MACHINES(state, machines) {
    state.machines = machines
  },
  SET_SELECTED_COMPANY(state, company) {
    state.selectedCompany = company
  },
  SET_LOADING_RECIPE(state, data) {
    state.loadingRecipe = data
  },

  SET_LOADING_WEIGHT(state, data) {
    state.loadingWeight = data
  },

  SET_LOADING_SYSTEM_STATES(state, data) {
    state.loadingSystemStates = data
  },

  SET_SYSTEM_STATES(state, data) {
    state.systemStates = data
  },

  SET_ACTUAL_RECIPE_TO_VALUES(state, data) {
    state.actualRecipe2Values = data
  },

  SET_TARGET_RECIPE_TO_VALUES(state, data) {
    state.targetRecipe2Values = data
  },
  SET_LOADING_FEEDER_STABLES2(state, data) {
    state.loadingFeederStables2 = data
  },

  SET_FEEDER_STABLES(state, data) {
    state.feederStables = data
  },

  SET_LOADING_LOCATIONS_TABLE(state, data) {
    state.loadingLocationsTable = data
  },

  SET_LOADING_ZONES_TABLE(state, data) {
    state.loadingZonesTable = data
  },

  SET_LOADING_MACHINES_TABLE(state, data) {
    state.loadingMachinesTable = data
  },
  
  SET_LOADING_WEEKLY_RUNNING_HOURS1(state, data) {
    state.loadingWeeklyRunningHours1 = data
  },

  SET_LOADING_ENABLED_PROPERTIES(state, isLoading) { state.loadingEnabledProperties = isLoading },
  SET_ENABLED_PROPERTIES(state, properties) { state.enabledProperties = properties },
  
  // BD Batch Blender
  SET_RUNNING_PERCENTAGE(state, totalRunningPercentage) { state.totalRunningPercentage = totalRunningPercentage },
  SET_RECIPE_VALUES(state, recipeValues) { state.recipeValues = recipeValues },

  SET_DOWNTIME_DISTRIBUTION(state, data) { state.downtimeDistribution = data },

  SET_LOADING_DATA_TOOL_SERIES(state, loading) { state.loadingDataToolSeries = loading },
  SET_DATA_TOOL_SERIES(state, series) { state.dataToolSeries = series },
  SET_TAGS(state, tags) { state.tags = tags },
  SET_DATA_TOOL_TIME_RANGE(state, timeRange) { state.dataToolTimeRange = timeRange }
}