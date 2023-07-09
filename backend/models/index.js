const Blog = require('./blog')
const User = require('./user')

const ReadList = require('./read_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadList, as: 'markedBlogs' })

module.exports = {
  Blog, User, ReadList
}