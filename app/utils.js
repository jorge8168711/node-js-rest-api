function parseJson (str) {
  let value = {}
  try {
    value = JSON.parse(str)
  } catch (e) {
    return value
  }

  return value
}

function validateString (value = '', len = 0, exact = false) {
  const error = { message: null }

  if (typeof value !== 'string') {
    error.message = 'The provided value is not a string.'
  }

  const valueLength = value.trim().length
  const isExact = exact && valueLength === len
  const hasValidLength = !exact && valueLength > len

  if (!isExact || !hasValidLength) {
    error.message = 'The provided string has an invalid length.'
  }

  return error.message ? { error } : value
}

function getInvalidValues (values) {
  const result = {}

  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      const value = values[key]

      if (!value?.error) continue

      if (value.error) {
        result[key] = value
      }
    }
  }

  return result
}

module.exports = {
  parseJson,
  validateString,
  getInvalidValues
}
