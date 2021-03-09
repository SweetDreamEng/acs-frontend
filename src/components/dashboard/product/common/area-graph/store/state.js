function defaultTimeRange() {
  const dateTimeIsoString = new Date().toISOString().substr(0, 10)

  return {
    timeRangeOption: 'last24Hours',
    dateFrom: dateTimeIsoString,
    dateTo: dateTimeIsoString,
    timeFrom: '00:00',
    timeTo: '00:00'
  }
}

export default () => ({
  isLoading: false,
  items: [],
  isImperial: false,
  timeRange: defaultTimeRange()
})