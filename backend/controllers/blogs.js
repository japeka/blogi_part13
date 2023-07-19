const router = require('express').Router()

const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')
const { Blog, User, Session } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
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

  router.post('/', tokenExtractor, tokenValidator, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    if(req.session) {
      const currentTokenExpire = new Date().getTime()
      if(currentTokenExpire <= req.session.sessionExpire) {
        const blog = await Blog.create({...req.body, userId: user.id})
        res.status(201).json(blog)
      } else {  
        res.status(201).json({error: 'token expired'})
      }
    } else {
      res.status(201).json({error: 'token not found'})
    }
  })

  router.delete('/:id',tokenExtractor, tokenValidator, blogFinder, async (req, res) => {
   if(req.decodedToken.id && req.session && req.blog) {
      const currentTokenExpire = new Date().getTime()
      if(currentTokenExpire <= req.session.sessionExpire) {
        if(req.decodedToken.id === req.blog.userId) { 
          await req.blog.destroy() 
          return res.status(204).end()
        } else {
          return res.status(404).json({error: 'User cannot delete the blog as user is not owner of the blog'})
        }
      } else {
        return res.status(404).json({error: 'Token expired'})
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