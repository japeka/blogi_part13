const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { ReadList } = require('../models')
  
const readingListFinder = async (req, res, next) => {
  req.readingList = await ReadList.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const readList = await ReadList.findAll()
  res.json(readList)
})

router.put('/:id',tokenExtractor,readingListFinder, async (req, res) => {
  if(req.decodedToken.id && req.readingList && req.body) {
    if(req.decodedToken.id === req.readingList.userId) {
      req.readingList.read = req.body.read
      await req.readingList.save()
      res.json(req.readingList).end
    } else {
      return res.status(404).json({error: 'User is not allowed to mark because he is not owner of the readlist'})
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