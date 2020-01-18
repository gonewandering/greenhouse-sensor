const LOS = require('local-object-store')
const store = new LOS('./data')

module.exports = {
  get: () => {
    return new Promise ((suc, cat) => {
      store.load('config', (err, data) => {
        if(err) { return cat(err) }
        return suc(data)
      })
    })
  },

  set: (obj) => {
    obj.id = 'config'

    return new Promise((suc, cat) => {
      store.add(obj, (err) => {
        if (err) { return cat(err) }
        return suc()
      })
    })
  }
}
