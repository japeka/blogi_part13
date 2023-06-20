// const main = async () => {
//     try {
//       await sequelize.authenticate()
//       console.log('Connection has been established successfully.')
//       const allBlogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
//       sequelize.close()
//       //   const blogs = await Blog.findAll()
//       allBlogs.forEach(blog => {
//         console.log(
//         `${blog.author}: '${blog.title}', ${blog.likes} likes`
//         )
//       })
//     } catch (error) {
//       console.error('Unable to connect to the database:', error)
//     }
//   }
//   main()
