// All the server logic for both HTTP and HTTPS servers

const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const handlers = require('./lib/handlers')

function configureServer (req, res) {
  // Deprecated way to get the url data
  // const test = url.parse(req.url, true) // returns URL object
  // const trimmedPath = test.pathname.replace(/^\/+|\/+$/g, '') // cleaned path name

  // Get the url to parse it
  const parsedUrl = new url.URL(req.url, 'http://localhost:3000/')
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '') // cleaned path name

  // Get HTTP method
  const method = req.method.toLowerCase()

  // Get query string as an object
  const queryStringObj = Object.fromEntries(new URLSearchParams(parsedUrl.searchParams))

  // Get HTTP request headers as an object
  const headers = req.headers

  // STREAMS
  // are bits of information that are coming in a little bit at the time as spoused to all at once
  // payloads that came as part an HTTP request coming to the HTTP server as a stream
  // we need collect that stream as comes in and then when the stream told us we are at the end
  // collects that in a coherent thing.
  // before we can figure out what that payload is

  // Get payload if any
  const decoder = new StringDecoder('utf-8')
  let buffer = ''

  // listen the received stream data
  req.on('data', (data) => {
    buffer += decoder.write(data)
  })

  // triggered when the request ends
  req.on('end', () => {
    // the buffer is going to be appended with wherever we just ended
    buffer += decoder.end()

    // Chose the handler this request should go. If one is not found use not found handler.
    const handler = handlers.getHandler(trimmedPath)

    // Construct the data object to send to the handler
    const data = {
      trimmedPath, queryStringObj, method, headers, payload: buffer
    }

    // Route the request to the handler specified in the router
    handler(data, (error, response) => {
      const { status: statusCode, data } = response

      // Use the status code called back by the handler, or default to 200
      const status = typeof statusCode === 'number' ? statusCode : 200
      const payloadData = typeof data === 'object' ? response : {}

      // Convert the payload to a string
      let stringPayload = JSON.stringify(payloadData)

      if (error) {
        stringPayload = JSON.stringify({ ...response, message: error.message })
      }

      // Return the response
      // we use the built in writeHead method that came on every response object received by the
      // HTTP server to write the status code
      res.setHeader('Content-Type', 'application/json') // set the content type of the response
      res.writeHead(status).end(stringPayload)
    })
  })
}

module.exports = configureServer
