const daysLoaded = (newDays) => {
  return {
    type: 'DAYS_LOADED',
    payload: newDays
  }
}

export { daysLoaded }