const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'SequelizeValidationError') {
      if(error?.errors[0]?.validatorKey==='isEmail') {
         return response.status(400).json({ error: 'Validation isEmail on username failed' })
      }
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    } 

    next(error)
  }

module.exports = {errorHandler} 
 