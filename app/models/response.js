class Response {
  constructor ({ data = {}, status = 200 }) {
    this.data = data
    this.status = status
  }
}

module.exports = { Response }
