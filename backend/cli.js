require('dotenv').config()

const { Sequelize, QueryTypes /*Model, DataTypes*/  } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

// class Blog extends Model {}

// Blog.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     author: {
//       type: DataTypes.TEXT,
//       allowNull: true
//     },
//     url: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     title: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     likes: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0
//     }
//   }, {
//     sequelize,
//     underscored: true,
//     timestamps: false,
//     modelName: 'blog'
//   })


const main = async () => {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      const allBlogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
      sequelize.close()
      //   const blogs = await Blog.findAll()
      allBlogs.forEach(blog => {
        console.log(
        `${blog.author}: '${blog.title}', ${blog.likes} likes`
        )
      })
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
  
  main()