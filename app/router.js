const handlers = {}

// Sample handler
handlers.sample = (data, func) => {
  // Callback a http status code, and a payload object
  func(406, { name: 'Sample handler' })
}

handlers.notFound = (data, func) => {
  func(404)
}

function getHandler (path) {
  const handler = handlers[path]
  if (typeof handler !== 'undefined') return handler
  return handlers.notFound
}

module.exports = { handlers, getHandler }
