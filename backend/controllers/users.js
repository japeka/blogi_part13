const router = require('express').Router()

const { User, Blog } = require('../models')

const userFinder = async (req, res, next) => {
    req.user = await User.findOne({
        where: {username: req.params.username}
    })
    next()
  }
  
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ['id','userId']}
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const where =  {}
  if(req.query.read) { 
    where.read = req.query.read === "true" ? "true": "false";
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'], 
    include: {
      model: Blog,
      as: 'readings',
      attributes: {exclude: ['userId']},
      through: {
         where,
         attributes: {
          exclude: ['userId', 'blogId'],
        },
      },
    },
  })

  if(user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json(user)
})

router.put('/:username', userFinder, async (req, res) => {
    if (req.user)  {
        if(!req.body.name) {
          return res.status(404).json({error: 'name missing'})
        }
        req.user.name = req.body.name 
        await req.user.save()
        return res.json(req.user)
    } else {
      return res.status(404).json({error: 'User not found'})
    }
  })

module.exports = router