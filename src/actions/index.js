export * from "./spinners"
export * from "./classrooms"

export const INITIALIZE_STORE = "INITIALIZE_STORE"

export const initializeStore = (json) => {
  window.localStorage.setItem("spinner", json)
  window.location.reload()
}
