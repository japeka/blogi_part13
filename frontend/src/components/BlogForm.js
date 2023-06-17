import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title,author,url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const labelStyle = 'ml-4 -mt-10 text-xs text-blue-400 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-mt-8 peer-placeholder-shown:text-base duration-300 uppercase'
  const inputStyle = 'px-4 py-2 w-full border border-slate-600 placeholder-transparent'
  const buttonStyle = 'create-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-10 uppercase w-full'

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 uppercase text-blue-500 mt-5">create new</h2>
      <form onSubmit={addBlog}>
        <div className="flex flex-col items-start mb-9">
          <input
            type="text"
            id = "blogTitle"
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            className={'title ' + inputStyle}
          />
          <label htmlFor="title" className={labelStyle}>title</label>
        </div>

        <div className="flex flex-col items-start mb-9">
          <input
            type="text"
            id = "blogAuthor"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
            className={'author ' + inputStyle}
          />
          <label htmlFor="author" className={labelStyle}>author</label>
        </div>

        <div className="flex flex-col items-start mb-9">
          <input
            type="text"
            id = "blogUrl"
            onChange={({ target }) => setUrl(target.value)}
            value={url}
            className={'url ' + inputStyle}
          />
          <label htmlFor="url" className={labelStyle}>url</label>
        </div>
        <button id="blogCreate" className={buttonStyle} type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm
