const selectedMachine = (state) => {
  if (state.selectedId) {
    const _machine = state.data.find((machine) => machine.id === state.selectedId)

    return _machine
  }

  return {}
}

const extendedMachines = (state) => {
  const _machines = state.machines.slice()

  _machines.unshift({
    id: 0,
    name: 'Not Assigned'
  })

  return _machines
}

const timeRangeLabel = (state) => (id) => {
  let timeRange = null

  if (id === 'inventory') {
    timeRange = state.inventoryTimeRange
  } else if (id === 'weight') {
    timeRange = state.weightTimeRange
  } else if (id === 'utilization') {
    timeRange = state.utilizationTimeRange
  } else if (id === 'energy-consumption') {
    timeRange = state.energyConsumptionTimeRange
  } else if (id === 'process-rate') {
    timeRange = state.processRateTimeRange
  }

  if (timeRange.timeRangeOption !== 'custom') {
    return state.timeRageOptions.find((item) => item.value === timeRange.timeRangeOption).label
  } else {
    return timeRange.dateFrom + ' ' + timeRange.timeFrom + ' ~ ' + timeRange.dateTo + ' ' + timeRange.timeTo
  }
}

const selectedTimeRange = (state) => {
  if (state.selectedTimeRangeKey === 'inventory') return state.inventoryTimeRange
  else if (state.selectedTimeRangeKey === 'weight') return state.weightTimeRange
  else if (state.selectedTimeRangeKey === 'utilization') return state.utilizationTimeRange

  return ''
}

export default {
  selectedMachine,
  extendedMachines,
  timeRangeLabel,
  selectedTimeRange
}
