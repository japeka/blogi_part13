import './App.css'
import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(['error', exception.response.data])
      setTimeout(() => {setNotification(null)}, 7000)
    }
  }


  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObject)
      setBlogs([...blogs, savedBlog])
      setNotification(['success',`A new blog ${savedBlog.title} created by ${savedBlog.author}`])
      setTimeout(() => {setNotification(null)}, 5000)
    } catch (exception) {
      setNotification(['error', exception.response.data])
      setTimeout(() => {setNotification(null)}, 7000)
    }
  }

  const updateLikes = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id,blogObject)
      const foundBlogs = blogs.filter(blog => blog.id !== updatedBlog.id)
      setBlogs([...foundBlogs,updatedBlog])
      setNotification(['success',`Blog ${updatedBlog.title}'s likes updated to ${updatedBlog.likes}`])
      setTimeout(() => {setNotification(null)}, 5000)
    } catch(exception) {
      setNotification(['error', exception.response.data])
      setTimeout(() => {setNotification(null)}, 7000)
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      const foundBlogs = blogs.filter(blog => blog.id !== id)
      setBlogs([...foundBlogs])
      setNotification(['success','Blog deleted successfully'])
      setTimeout(() => {setNotification(null)}, 5000)
    } catch(exception) {
      setNotification(['error', exception.response.data])
      setTimeout(() => {setNotification(null)}, 7000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const sortedBlogsByLikes = blogs.sort((a, b) => b.likes - a.likes)
  const blogForm = () => (
    <div>
      <span className="p-2">{user && `${user.name} logged in`}</span>
      <button className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 mb-2 uppercase"
        onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      {/* let's keep blogs behind login */}
      <div className="w-full bg-white rounded-lg shadow mt-3">
        <ul className="bg-orange-50 divide-gray-100">
          {sortedBlogsByLikes.map((blog) =>
            (<Blog key={blog.id}
              blog={blog}
              likes={updateLikes}
              remove={removeBlog}
            />))}
        </ul>
      </div>
    </div>
  )

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500 text-center">blogs</h2>
      <Notification notification={notification} />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm username={username} password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        : blogForm()}
    </div>
  )
}

export default App
