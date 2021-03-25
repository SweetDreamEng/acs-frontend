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

const timeRangeDataToolLabel = (state) => (timeRange) => {
  if (timeRange.timeRangeOption !== 'custom') {
    const tr = state.timeRageOptions.find((item) => item.value === timeRange.timeRangeOption)

    return tr ? tr.label : ''
  } else {
    return timeRange.dates[0] + ' ~ ' + timeRange.dates[1]
  }
}

const timeRangeFromTo = (state) => (timeRange) => {
  if (timeRange.timeRangeOption !== 'custom') {
    const tr = state.timeRageOptions.find((item) => item.value === timeRange.timeRangeOption)
    const trOption = tr ? tr.value : 'last24Hours'
    const dateGetTime = new Date().getTime()

    switch (trOption) {
    case 'last30Min':
      return {
        from: dateGetTime - (30 * 60 * 1000),
        to: dateGetTime
      }
    case 'lastHour':
      return {
        from: dateGetTime - (60 * 60 * 1000),
        to: dateGetTime
      }
    case 'last4Hours':
      return {
        from: dateGetTime - (4 * 60 * 60 * 1000),
        to: dateGetTime
      }
    case 'last12Hours':
      return {
        from: dateGetTime - (12 * 60 * 60 * 1000),
        to: dateGetTime
      }
    case 'last24Hours':
      return {
        from: dateGetTime - (24 * 60 * 60 * 1000),
        to: dateGetTime
      }
    case 'last48Hours':
      return {
        from: dateGetTime - (48 * 60 * 60 * 1000),
        to: dateGetTime
      }
    case 'last3Days':
      return {
        from: dateGetTime - (3 * 24 * 60 * 60 * 1000),
        to: dateGetTime
      }
    case 'last7Days':
      return {
        from: dateGetTime - (7 * 24 * 60 * 60 * 1000),
        to: dateGetTime
      }
    case 'last24Days':
      return {
        from: dateGetTime - (24 * 24 * 60 * 60 * 1000),
        to: dateGetTime
      }
    default:
      return {
        from: dateGetTime - (24 * 60 * 60 * 1000),
        to: dateGetTime
      }
    }
  } else {
    return {
      from: new Date(timeRange.dates[0]).getTime(),
      to: new Date(timeRange.dates[1]).getTime()
    }
  }
}

export default {
  selectedMachine,
  extendedMachines,
  timeRangeLabel,
  timeRangeDataToolLabel,
  timeRangeFromTo
}
