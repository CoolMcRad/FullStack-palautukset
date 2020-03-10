const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    if (request.get('Authorization')) {
    const getTokenFrom = request => {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
          const token = authorization.substring(7)
        } else {
            const token = null
        }
      }
    
        request.set('token', getTokenFrom(request))
    }

  
    next()
  }

  module.exports = {
    tokenExtractor
  }