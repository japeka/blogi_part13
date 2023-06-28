const jwt = require('jsonwebtoken')
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
    const blogs = await Blog.findAll()
    res.json(blogs)
  })

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.status(201).json(blog)
  })

router.delete('/:id',blogFinder, async (req, res) => {
      if(req.blog) { 
        await req.blog.destroy() 
      } else { 
        console.log("Blog not found")
        return res.status(404).json({error: 'Resource not found'})
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