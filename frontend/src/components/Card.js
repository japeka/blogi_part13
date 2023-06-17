import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ blog, likes,remove }) => {
  const textStyle = 'mb-3 font-normal text-gray-700 dark:text-gray-400'
  const buttonStyle = 'bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-5 ml-3 rounded p-10 uppercase'

  const addLike = () => {
    let newLikes = blog.likes + 1
    let user = blog.user.id
    const newBlogObject = { ...blog, likes: newLikes, user }
    delete newBlogObject['id']
    likes(blog.id,newBlogObject)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
    }
  }

  return blog.title && (
    <div className="card w-full bg-orange-120 p-5">
      <p className={'url ' + textStyle}>URL: {blog.url}</p>
      <p className={'likes ' + textStyle}>{'# '}<span className="countLikes">{blog.likes}</span>
        <button onClick={addLike} className={'blogLikes ' + buttonStyle}>likes</button>
      </p>
      <button id="blogRemove" onClick={deleteBlog} className={buttonStyle}>remove</button>
    </div>
  )}

Card.propTypes = {
  blog: PropTypes.object.isRequired,
  likes: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Card

