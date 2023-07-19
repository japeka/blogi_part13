const router = require('express').Router()

const {User,Session} = require('../models')

router.delete('/', async (request, response) => {
  const body = request.body

  if(!body.username) {
    return response.status(404).json({error: 'username not found'})
  }

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  if(user) {
    await Session.destroy({
      where: {
        userId: user.id
      }
    })

    return response.status(204).end()
  } else {
    return response.status(404).json({error: 'User not found'})
  }
  })
  
  module.exports = router