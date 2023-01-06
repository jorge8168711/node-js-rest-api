const { METHODS, ERRORS } = require('../constants')
const { Response } = require('../models/response')
const { validateString, getInvalidValues } = require('../utils')

const handlers = {}

handlers._users = {}

// Users - Post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = (data, callback) => {
  const { first_name: firstName, last_name: lastName, tos_agreement: tosAgreement, phone, password } = data
  const payload = {
    first_name: validateString(firstName),
    last_name: validateString(lastName),
    phone: validateString(phone, 10, true),
    password: validateString(password),
    tos_agreement: tosAgreement || false
  }
  const invalidFields = getInvalidValues(payload) || {}

  // if has invalid fields responds with a 404 error and the errors for each field
  if (Object.values(invalidFields).length) {
    callback(
      new Error('Missing required fields.'),
      new Response({ status: 404, data: payload })
    )
  }

  // Check that all the fields are filled out
}

handlers._users.get = (data, callback) => {}
handlers._users.put = (data, callback) => {}
handlers._users.delete = (data, callback) => {}

// Ping Handler
handlers.ping = (data, callback) => {
  // Callback a http status code, and a payload object
  callback(null, new Response())
}

handlers.notFound = (data, callback) => {
  callback(ERRORS[404], new Response({ status: 404 }))
}

handlers.users = (data, callback) => {
  // handle invalid methods for the users endpoint
  if (!Object.values(METHODS).includes(data.method)) {
    return callback(ERRORS[405], new Response({ status: 405 }))
  }

  handlers._users[data.method](data, callback)
}

function getHandler (path) {
  const handler = handlers[path]

  if (typeof handler !== 'undefined') return handler
  return handlers.notFound
}

module.exports = { getHandler }
