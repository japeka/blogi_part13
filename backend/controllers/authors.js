const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')

const router = require('express').Router()

const { Blog } = require('../models')


router.get('/', async (req, res) => {

  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
    attributes: ['author',  
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'blogs'],
      [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes']
    ],    
    group: 'author'
  })
  res.json(blogs)
})


  

module.exports = router