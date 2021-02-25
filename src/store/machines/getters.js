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

const timeRangeFromTo = (state) => (timeRange) => {
  if (timeRange.timeRangeOption !== 'custom') {
    const tr = state.timeRageOptions.find((item) => item.value === timeRange.timeRangeOption)
    const trOption = tr ? tr.value : 'last24Hours'

    switch (trOption) {
    case 'last30Min':
      return {
        from: new Date().getTime() - (30 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'lastHour':
      return {
        from: new Date().getTime() - (60 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'last4Hours':
      return {
        from: new Date().getTime() - (4 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'last12Hours':
      return {
        from: new Date().getTime() - (12 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'last24Hours':
      return {
        from: new Date().getTime() - (24 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'last48Hours':
      return {
        from: new Date().getTime() - (48 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'last3Days':
      return {
        from: new Date().getTime() - (3 * 24 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'last7Days':
      return {
        from: new Date().getTime() - (7 * 24 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    case 'last24Days':
      return {
        from: new Date().getTime() - (24 * 24 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    default:
      return {
        from: new Date().getTime() - (24 * 60 * 60 * 1000),
        to: new Date().getTime()
      }
    }
  } else {
    return {
      from: new Date(timeRange.dateFrom + ' ' + timeRange.timeFrom).getTime(),
      to: new Date(timeRange.dateTo + ' ' + timeRange.timeTo).getTime()
    }
  }
}

export default {
  selectedMachine,
  extendedMachines,
  timeRangeLabel,
  timeRangeFromTo
}
