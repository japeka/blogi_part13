const errorHandler = (error, request, response, next) => {
    console.log("error", error)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'SequelizeValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    }
  
    next(error)
  }

module.exports = {errorHandler} 
 