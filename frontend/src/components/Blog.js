import Card from './Card'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog,likes,remove }) =>  {
  const [visible, setVisible] = useState(false)
  const buttonStyle = 'bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-5 ml-3 rounded p-10 uppercase'
  return (
    <div>
      <li className="p-3 bg-orange-200 mb-2">
        <span className="title">{blog.title}</span> <span className="author ml-5 bg-yellow-100 p-2 hover:bg-yellow-200">{blog.author}</span>
        <button
          className={buttonStyle}
          onClick={() => setVisible(!visible)}
        >{visible ? 'hide': 'view'}</button>
      </li>
      {visible && <Card
        blog={blog}
        likes={likes}
        remove={remove}/>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likes: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}


export default Blog