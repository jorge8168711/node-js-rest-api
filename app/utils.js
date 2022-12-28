function parseJson (str) {
  let value = {}
  try {
    value = JSON.parse(str)
  } catch (e) {
    return value
  }

  return value
}

module.exports = {
  parseJson
}
