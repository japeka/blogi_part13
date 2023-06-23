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
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({error})        
    } 
  })

  //api/blogs
  router.delete('/:id',blogFinder, async (req, res) => {
    try {
      if(req.blog) { 
        await req.blog.destroy() 
        res.status(204).end()
      } else { 
        console.log("Blog not found")
        return res.status(404).json({error: 'Resource not found'})
      }
    } catch (error) {
      return res.status(400).json({error})        
    }
})

module.exports = router