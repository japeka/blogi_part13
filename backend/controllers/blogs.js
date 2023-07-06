const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { SECRET } = require('../util/config')

const router = require('express').Router()

const { Blog, User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }
  
router.get('/', async (req, res) => {

    let where = {}
    if(req.query.search) {
      where = {
        [Op.or]:[
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
        ]
      }
    }
  
    const blogs = await Blog.findAll({
      order: [['likes', 'DESC']],
      attributes: { exclude: ['userId']},
      include: {
        model: User,
        attributes: ['name', 'username']
      },
      where
    })
    res.json(blogs)
  })
  

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.status(201).json(blog)
  })

router.delete('/:id',tokenExtractor, blogFinder, async (req, res) => {
   if(req.decodedToken.id && req.blog) { 
        if(req.decodedToken.id === req.blog.userId) { 
          await req.blog.destroy() 
          return res.status(204).end()
        } else {
          return res.status(404).json({error: 'User cannot delete the blog as user is not owner of the blog'})
        }
   } else { 
     return res.status(404).json({error: 'Resource or token not found'})
   }
})

router.put('/:id',blogFinder, async (req, res) => {
    if (req.body.likes) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog).end
    } else {
      res.status(404).json({error: 'Likes property not found'}).end()
    }
  })
  

module.exports = router