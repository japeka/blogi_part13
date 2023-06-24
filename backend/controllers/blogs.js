const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }
  
  router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
  })

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
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