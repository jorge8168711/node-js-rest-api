exports.METHODS = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  delete: 'delete'
}

exports.ERRORS = {
  404: new Error('404 Not Found'),
  405: new Error('405 Method not allowed')
}
