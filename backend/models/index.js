const Blog = require('./blog')
const User = require('./user')

const ReadList = require('./read_list')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadList, as: 'readings' })

module.exports = {
  Blog, User, ReadList, Session
}