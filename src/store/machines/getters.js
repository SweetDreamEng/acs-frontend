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

const timeRangeLabel = (state) => (timeRange) => {
  if (timeRange.timeRangeOption !== 'custom') {
    const tr = state.timeRageOptions.find((item) => item.value === timeRange.timeRangeOption)

    return tr ? tr.label : ''
  } else {
    return timeRange.dateFrom + ' ' + timeRange.timeFrom + ' ~ ' + timeRange.dateTo + ' ' + timeRange.timeTo
  }
}

export default {
  selectedMachine,
  extendedMachines,
  timeRangeLabel
}
