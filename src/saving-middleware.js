  export default store => next => action => {
    const result = next(action)
    window.localStorage.spinner = JSON.stringify(store.getState())
    return result
  }
