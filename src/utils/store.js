export default {
  save (key, val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  fetch (key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]')
  },
  clear () {
    window.localStorage.clear()
  },
  remove (key) {
    window.localStorage.removeItem(key)
  }
}
