const debug = true

const debconsole = (...arg) => {
  if (debug) {
    console.log(...arg)
  }
}

module.exports = debconsole
