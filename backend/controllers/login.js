const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const {User, Session} = require('../models')

router.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({
      where: {
        username: body.username
      }
    })
  
    const passwordCorrect = body.password === 'salainen'
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

      
    const userForToken = {
      username: user.username,
      id: user.id,
    }
  
    const token = jwt.sign(userForToken, SECRET)

    if(token) {
      //valid for 120 seconds
      const newExpire = new Date().getTime() + 120000 
      const session = await Session.create({userId: user.id, sessionId: token, sessionExpire: newExpire})
      return response.status(200).send(session)
    }
    return response.status(404).json({error: 'token not found'})
  })
  
  module.exports = router