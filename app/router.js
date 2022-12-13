const handlers = {}

// Ping Handler
handlers.ping = (data, callback) => {
  // Callback a http status code, and a payload object
  callback(null, { status: 200, data: {} })
}

handlers.notFound = (data, callback) => {
  callback(new Error('404 Not Found'), { status: 404, data: {} })
}

function getHandler (path) {
  const handler = handlers[path]
  if (typeof handler !== 'undefined') return handler
  return handlers.notFound
}

module.exports = { handlers, getHandler }
