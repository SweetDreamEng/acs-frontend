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
  if (id === 'inventory') {
    if (state.inventoryTimeRange.timeRangeOption !== 'custom') {
      return state.timeRageOptions.find((item) => item.value === state.inventoryTimeRange.timeRangeOption).label
    } else {
      return state.inventoryTimeRange.dateFrom + ' ' + state.inventoryTimeRange.timeFrom + ' ~ ' + state.inventoryTimeRange.dateTo + ' ' + state.inventoryTimeRange.timeTo
    }
  } else if (id === 'weight') {
    if (state.weightTimeRange.timeRangeOption !== 'custom') {
      return state.timeRageOptions.find((item) => item.value === state.weightTimeRange.timeRangeOption).label
    } else {
      return state.weightTimeRange.dateFrom + ' ' + state.weightTimeRange.timeFrom + ' ~ ' + state.weightTimeRange.dateTo + ' ' + state.weightTimeRange.timeTo
    }
  } else if (id === 'utilization') {
    if (state.utilizationTimeRange.timeRangeOption !== 'custom') {
      return state.timeRageOptions.find((item) => item.value === state.utilizationTimeRange.timeRangeOption).label
    } else {
      return state.utilizationTimeRange.dateFrom + ' ' + state.utilizationTimeRange.timeFrom + ' ~ ' + state.utilizationTimeRange.dateTo + ' ' + state.utilizationTimeRange.timeTo
    }
  } else {
    return ''
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
