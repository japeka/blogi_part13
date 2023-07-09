const router = require('express').Router()

const { ReadList } = require('../models')
  
router.get('/', async (req, res) => {
  const readList = await ReadList.findAll()
  res.json(readList)
})

router.post('/', async (req, res) => {
    const readList = await ReadList.create(req.body)
    res.status(201).json(readList)
})

module.exports = router