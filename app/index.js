/**
 * Primary file for the API
 */

// dependencies
const http = require('http')

// the server should respond to all request with a string
const server = http.createServer((req, res) => {
  res.end('Hello')
})

// Start the server, and have it listen on the port 3000
server.listen(3000, () => {
  console.log('the server is running on the port 3000')
})
