  export default store => next => action => {
    const result = next(action)
console.log("RES : ", result)
    window.localStorage.spinner = JSON.stringify(store.getState())
console.log("SAVED : ", store.getState())
    return result
  }
