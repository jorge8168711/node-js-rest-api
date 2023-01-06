/**
 * Primary file for the API
 */

// Dependencies
const http = require('http')
const https = require('https')

const fs = require('fs')
const path = require('path')

const config = require('./config')
const configureServer = require('./server')

// Instantiate the HTTP server
const httpServer = http.createServer(configureServer)
// Start HTTP server
httpServer.listen(config.httpPort, () => {
  console.log(`the server is running on the port ${config.httpPort} in ${config.envName} mode`)
})

// Instantiate the HTTP server
const httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '/https/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/https/cert.pem'))
}

const httpsServer = https.createServer(httpsServerOptions, configureServer)
// Start HTTPS server
httpsServer.listen(config.httpsPort, () => {
  console.log(`the server is running on the port ${config.httpsPort} in ${config.envName} mode`)
})
