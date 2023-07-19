const router = require('express').Router()

const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { ReadList, Session } = require('../models')
  
const readingListFinder = async (req, res, next) => {
  req.readingList = await ReadList.findByPk(req.params.id)
  next()
}

const tokenValidator = async (req, res, next) => {
  req.session = await Session.findOne({
    where: {
      [Op.and]: [{
        userId: req.decodedToken.id
      },{
        sessionId: req.decodedToken.token
      }]
  }})
  next()
}

router.get('/', async (req, res) => {
  const readList = await ReadList.findAll()
  res.json(readList)
})

router.put('/:id',tokenExtractor, tokenValidator, readingListFinder, async (req, res) => {
  if(req.decodedToken.id && req.session && req.readingList && req.body) {
    const currentTokenExpire = new Date().getTime()
    if(currentTokenExpire <= req.session.sessionExpire) {
      if(req.decodedToken.id === req.readingList.userId) {
        req.readingList.read = req.body.read
        await req.readingList.save()
        return res.json(req.readingList)
      } else {
        return res.status(404).json({error: 'User is not allowed to mark because he is not owner of the readlist'})
      }
    } else {
      return res.status(404).json({error: 'Token expired'})
    }
  } else { 
    return res.status(404).json({error: 'Resource, token or body not found'})
  }
})

router.post('/', async (req, res) => {
    const readList = await ReadList.create(req.body)
    res.status(201).json(readList)
})

module.exports = router