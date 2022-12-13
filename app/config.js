/**
 * Create and export configuration variables.
 */

const environments = {
  development: {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'development'
  },
  stage: {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'stage'
  },
  production: {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'stage'
  }
}

// Determine which environment was passed as command-line argument
const currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// Check that the current environment is one of the environments above, if not, default to development
const environment = environments[currentEnv] || environments.development

module.exports = environment
